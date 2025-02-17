const { generateReadme } = require('./utils/generateReadme');
const { generateDiataxisDocs } = require('./utils/generateDocs');

const CUSTOM_MODULES_DIR = '../web/modules/custom';
const THEMES_DIR = '../web/themes/custom';
const ROOT_README = '../README.md';
const CONFIG_FILES = ['../composer.json', '../package.json', '../.github/workflows/ci.yml'];

generateReadme(CUSTOM_MODULES_DIR, 'module');
generateReadme(THEMES_DIR, 'theme');
generateDiataxisDocs(ROOT_README, CONFIG_FILES);
