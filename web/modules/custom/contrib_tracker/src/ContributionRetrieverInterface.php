<?php

namespace Drupal\contrib_tracker;

use Drupal\Core\Cache\Cache;

/**
 * Interface for Contribution Retriever service.
 */
interface ContributionRetrieverInterface {

  /**
   * Get user information from drupal.org.
   *
   * @param string $username
   *   The drupal.org username.
   *
   * @return \Hussainweb\DrupalApi\Entity\User
   *   User information returned from drupal.org API.
   */
  public function getUserInformation($username);

  /**
   * Get node data from drupal.org.
   *
   * @param int $nid
   *   The nid of the node on drupal.org.
   * @param int $cacheExpiry
   *   The cache expiry for the item.
   *
   * @return \Hussainweb\DrupalApi\Entity\Node
   *   The node data from drupal.org.
   */
  public function getDrupalOrgNode($nid, $cacheExpiry = Cache::PERMANENT);

  /**
   * Get node data from drupal.org.
   *
   * @param int $nid
   *   The nid of the node on drupal.org.
   *
   * @return \Hussainweb\DrupalApi\Entity\Node
   *   The node data from drupal.org.
   */
  public function getDrupalOrgNodeFromApi($nid);

  /**
   * Get taxonomy term data from drupal.org
   *
   * @param int $tid
   *   Taxonomy term id.
   *
   * @return \Hussainweb\DrupalApi\Entity\TaxonomyTerm
   *   Taxonomy term data from drupal.org
   */
  public function getDrupalOrgTaxonomyFromApi($tid);

  /**
   * Get comments by an user on drupal.org.
   *
   * @param int $uid
   *   The uid of the user on drupal.org.
   *
   * @return \Hussainweb\DrupalApi\Entity\Collection\CommentCollection
   *   List of comments from drupal.org.
   */
  public function getDrupalOrgCommentsByAuthor($uid);

  /**
   * Get file data from drupal.org.
   *
   * @param int $fid
   *   The fid of the file on drupal.org.
   *
   * @return \Hussainweb\DrupalApi\Entity\File
   *   The file data from drupal.org.
   */
  public function getFile($fid);

}
