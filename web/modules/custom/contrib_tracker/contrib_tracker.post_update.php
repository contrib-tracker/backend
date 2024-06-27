<?php

/**
 * @file
 * Install, update and uninstall functions for the Admin Toolbar module.
 */

/**
 * Update contrib_tracker sitename 1.
 */
function contrib_tracker_post_update_change_site_name() {
  \Drupal::configFactory()->getEditable('system.site')
    ->set('name', 'Contribution Tracker - Update 2')
    ->save();
}
