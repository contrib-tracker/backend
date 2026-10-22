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

## Theme

The default theme is still `contribtracker`, which is built with Vite:

```bash
cd web/themes/custom/contribtracker && ddev npm install && ddev npm run build && ddev drush cr
```

The `ct` theme will replace it. It is not installed yet. It has no build step: Drupal serves its CSS and JavaScript as written, so a `ddev drush cr` is enough after changing it. Its one runtime dependency, Select2, is installed from the theme's `package.json` with `npm ci --omit=dev` in the theme directory (CI and the platform build do this). Its tools need Node 26 (see its `.node-version`), but DDEV stays on Node 18 until the switch because the old theme does not build on 26. Until then run them with a host Node 26:

```bash
npm --prefix web/themes/custom/ct ci
npm --prefix web/themes/custom/ct run lint
npm --prefix web/themes/custom/ct test
```

See the theme's [README](../web/themes/custom/ct/README.md).

You can access the site at: [https://contribtracker.ddev.site/](https://contribtracker.ddev.site/).
