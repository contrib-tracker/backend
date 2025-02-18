const path = require('path');
const { generateReadme } = require('./utils/generateReadme');

// Define the directory of your custom modules
const CUSTOM_MODULES_DIR = path.resolve(process.cwd(), '../web/modules/custom');

(async () => {
    console.log('Running generateReadme for testing...');
    const results = await generateReadme(CUSTOM_MODULES_DIR);
    console.log('Test Complete. Generated README files:', results);
})();
