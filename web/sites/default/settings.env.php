<?php

// First, try to determine where we are running.
$infra = match(true) {
  getenv('IS_DDEV_PROJECT') == 'true' => 'ddev',
  !empty($_ENV['PLATFORM_VARIABLES']) => 'platform',
  !empty($_ENV['PANTHEON_ENVIRONMENT']) => 'pantheon',
};

// Based on where we are running, find out the environment.
$env_type = '';
$env = '';
$release = '';
switch ($infra) {
  case 'ddev':
    $env_type = 'local';
    $env = 'local';
    // Leave release as blank for now.
    // Possible candidates for the future:
    // Git commit ID, branch name, etc.
    $release = '';
    break;

  case 'platform':
    $env_type = getenv('PLATFORM_ENVIRONMENT_TYPE');
    $env = getenv('PLATFORM_BRANCH');
    $env = $env == 'main' ? 'production' : $env;
    // While this can help us classify builds, it is difficult to use
    // to figure out which commit is deployed. But this is the best we
    // have right now.
    $release = getenv('PLATFORM_TREE_ID');
    break;

  case 'pantheon':
    $env_type = getenv('PANTHEON_ENVIRONMENT');
    $env = $env_type;
    // TODO This needs investigation to see if it is possible.
    $release = '';
    break;
}

// Use these variables to set whatever needs setting.
$_SERVER['SENTRY_ENVIRONMENT'] = $env;
$_SERVER['SENTRY_RELEASE'] = $release;
