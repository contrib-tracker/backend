# Testing

We have a few tests written with PHPUnit and [Drupal-Test-Traits](https://git.drupalcode.org/project/dtt) package but most of our tests are written using Cypress.

## PHPUnit tests

You will find a few unit tests in the custom modules and then `ExistingSite` tests in [`tests/src/ExistingSite`](tests/src/ExistingSite). You can run these tests with DDEV.

```bash
# Unit tests
$ ddev phpunit --testsuite unit

# ExistingSite tests need more flags
$ ddev phpunit --bootstrap=./vendor/weitzman/drupal-test-traits/src/bootstrap-fast.php --configuration ./phpunit.xml --testsuite existing-site
```

## Cypress tests

Cypress tests may be found in the theme directory at [`web/themes/custom/contribtracker/cypress`](web/themes/custom/contribtracker/cypress). You can run them interactively or from the command line with or without DDEV. This documentation will only cover DDEV.

### Run Cypress tests

```bash
ddev cypress-run
```

### Running Cypress in interactive mode (Mac)

Running Cypress in interactive mode inside the container requires an X11 server. Follow these instructions for macOS.

We first need an X11 server. XQuartz is a tested option for macOS. See [this blog post](https://sourabhbajaj.com/blog/2017/02/07/gui-applications-docker-mac/) for more details and other OS options.

```bash
# Install XQuartz
brew install xquartz --cask
```

Open XQuartz in any way you wish (`open -a XQuartz` from the command line) and edit settings to allow network connections. To do this, open XQuartz, and from the menu, select XQuartz -> Settings. You will find the option in the "Security" tab.

It is required to restart your machine after installing XQuartz. After restarting, you may need to allow your local IP to get XQuartz to work.

```bash
# Run below command
xhost + 127.0.0.1
```

After this, you will be able to open cypress in "interactive" mode, run the following command:

```bash
ddev cypress-open
```

See [https://github.com/tyler36/ddev-cypress?tab=readme-ov-file#commands](https://github.com/tyler36/ddev-cypress?tab=readme-ov-file#commands) for more details.
