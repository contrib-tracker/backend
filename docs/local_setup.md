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

## Theme Build

```bash
cd web/themes/custom/contribtracker && npm install && npm run build && ddev drush cr
```

### Optional: contribtracker_modern theme

The `contribtracker_modern` theme is a Vite+ rebuild of the same design. It needs Node 22.18 or newer, which the DDEV container does not provide, so build it on the host:

```bash
cd web/themes/custom/contribtracker_modern && npm ci && npm run build
ddev drush config:set system.theme default contribtracker_modern -y && ddev drush cr
```

See the theme's [README](../web/themes/custom/contribtracker_modern/README.md) for details.

You can access the site at: [https://contribtracker.ddev.site/](https://contribtracker.ddev.site/).
