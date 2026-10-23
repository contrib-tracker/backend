# Local environment setup

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

Restore the database and files from the S3 repository with [resticprofile](https://creativeprojects.github.io/resticprofile/). This is a limited, sanitized set of the production content. You need `restic`, `resticprofile` and the 1Password CLI (`op`) installed, and access to the `Contrib Tracker Assets Bucket on AWS` item in the `Project Contrib Tracker` vault. Without 1Password, set `ASSETS_AWS_ACCESS_KEY_ID` and `ASSETS_AWS_SECRET_ACCESS_KEY` instead.

```bash
resticprofile ddev.restore latest
```

The entire production site is available in the same bucket through the `production` group (`resticprofile production.restore latest`). It holds unsanitized user data, so use it only when you need it.

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

## Theme

The `ct` theme has no build step: Drupal serves its CSS and JavaScript as written, so a `ddev drush cr` is enough after changing it. Its one runtime dependency, Select2, is installed from the theme's `package.json` with `npm ci --omit=dev` (CI and the platform build do this). To lint and test the theme, run its tools through DDEV:

```bash
ddev exec -d /var/www/html/web/themes/custom/ct npm ci
ddev exec -d /var/www/html/web/themes/custom/ct npm run lint
ddev exec -d /var/www/html/web/themes/custom/ct npm test
```

See the theme's [README](../web/themes/custom/ct/README.md).

You can access the site at: [https://contribtracker.ddev.site/](https://contribtracker.ddev.site/).
