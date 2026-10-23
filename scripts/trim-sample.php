<?php

/**
 * @file
 * Trims the content to a representative sample for development and testing.
 *
 * Keeps a random percentage of code contributions per year, all recent ones,
 * the issues they link to, all other content types, and the users they refer
 * to. It also deletes the files that nothing uses any more, such as pictures
 * of deleted users. Run it on a copy of the data, never on production, and
 * sanitize afterwards with: ddev drush sql:sanitize -y
 *
 * Run with: ddev drush php:script scripts/trim-sample.php
 * Options (environment variables): SAMPLE_PERCENT (default 10) and
 * RECENT_DAYS (default 60).
 */

$percent = (int) (getenv('SAMPLE_PERCENT') ?: 10);
$recent_days = (int) (getenv('RECENT_DAYS') ?: 60);
$db = \Drupal::database();

/**
 * Deletes entities of one type in chunks.
 */
function trim_delete(string $type, array $ids): void {
  $storage = \Drupal::entityTypeManager()->getStorage($type);
  foreach (array_chunk($ids, 100) as $chunk) {
    $storage->delete($storage->loadMultiple($chunk));
    $storage->resetCache($chunk);
  }
}

// 1. Choose the code contributions to keep.
$rows = $db->query("SELECT nid, YEAR(FROM_UNIXTIME(created)) AS y, created FROM {node_field_data} WHERE type = 'code_contribution'")->fetchAll();
$by_year = [];
$keep = [];
$cutoff = time() - $recent_days * 86400;
foreach ($rows as $row) {
  if ($row->created >= $cutoff) {
    $keep[$row->nid] = TRUE;
  }
  else {
    $by_year[$row->y][] = $row->nid;
  }
}
mt_srand(42);
foreach ($by_year as $year => $nids) {
  shuffle($nids);
  foreach (array_slice($nids, 0, max(1, (int) ceil(count($nids) * $percent / 100))) as $nid) {
    $keep[$nid] = TRUE;
  }
}
$delete = array_values(array_diff(array_column($rows, 'nid'), array_keys($keep)));
printf("Code contributions: keeping %d, deleting %d\n", count($keep), count($delete));
trim_delete('node', $delete);

// 2. Keep only the issues that remaining contributions link to.
$linked = $db->query("SELECT DISTINCT field_code_contrib_issue_link_target_id FROM {node__field_code_contrib_issue_link}")->fetchCol();
$issues = $db->query("SELECT nid FROM {node_field_data} WHERE type = 'issue'")->fetchCol();
$delete = array_values(array_diff($issues, $linked));
printf("Issues: keeping %d, deleting %d\n", count($issues) - count($delete), count($delete));
trim_delete('node', $delete);

// 3. Keep the users that remaining content refers to, plus administrators.
$keep_users = [0, 1];
$keep_users = array_merge($keep_users, $db->query("SELECT DISTINCT uid FROM {node_field_data}")->fetchCol());
$keep_users = array_merge($keep_users, $db->query("SELECT DISTINCT field_contribution_author_target_id FROM {node__field_contribution_author}")->fetchCol());
$keep_users = array_merge($keep_users, $db->query("SELECT DISTINCT entity_id FROM {user__roles} WHERE roles_target_id = 'administrator'")->fetchCol());
$users = $db->query("SELECT uid FROM {users_field_data}")->fetchCol();
$delete = array_values(array_diff($users, array_unique($keep_users)));
printf("Users: keeping %d, deleting %d\n", count($users) - count($delete), count($delete));
trim_delete('user', $delete);

// 4. Delete files that nothing uses any more. Deleting a user only releases the
// usage of its picture, so the file and its image style derivatives remain.
$files = $db->query("SELECT f.fid FROM {file_managed} f WHERE NOT EXISTS (SELECT 1 FROM {file_usage} u WHERE u.fid = f.fid)")->fetchCol();
printf("Unused files: deleting %d\n", count($files));
trim_delete('file', $files);
