# Getting Started with Contribution Tracker

## Overview

The Contribution Tracking System monitors and analyzes contributions across projects, leveraging Drupal’s features for capturing, categorizing, and reporting data. It aids in resource allocation, performance evaluation, and recognizing achievements.

## Tools & Prerequisites

Major tools that are required for setting up the site. It is recommended to use the latest version or at least the minimum version as mentioned below. It is mandatory to add [your SSH key to your GitHub account settings](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account).

- [OrbStack](https://orbstack.dev/) or [Docker](https://docs.docker.com/install/)

- [Composer](https://getcomposer.org/download/) (optional if used via DDEV)

- [DDEV](https://ddev.com/get-started/) - v1.23.3 and above.

- [NodeJs](https://nodejs.org/en/download) (optional if used via DDEV)

## Local environment setup

Once you have all the tools installed, proceed to run the following to clone the repository.

```bash
git clone git@github.com:contrib-tracker/backend.git
```

Change to the directory of the repository and run DDEV to start.

```bash
cd backend
ddev start
```

Once DDEV has been set up successfully, it will display the links in the terminal. Next, run the following to fetch all dependencies.

```bash
ddev composer install
```

You can pull the database from the platform.sh directly. Make sure that the [PLATFORMSH_CLI_TOKEN is set](https://ddev.readthedocs.io/en/latest/users/providers/platform/).

```bash
ddev pull platform
```

Make sure code changes are updated.

```bash
ddev drush deploy -y
```

## Post Installation

Generate a one-time login link and reset the password through it.

```bash
ddev drush uli
```

Clear the cache using drush

```bash
ddev drush cr
```

## Theme Build

```bash
cd web/themes/custom/contribtracker && npm install && npm run build && ddev drush cr
```

You can access the site at: [https://contribtracker.ddev.site/](https://contribtracker.ddev.site/).
