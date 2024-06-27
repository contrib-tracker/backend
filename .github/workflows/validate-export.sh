#!/bin/bash

ddev drush --no-cache-clear updatedb --yes
ddev drush config:import  --yes
ddev drush cache:rebuild --yes
ddev drush config:status
ddev drush deploy:hook --yes
ddev drush config:status
