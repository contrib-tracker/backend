const fs = require('fs-extra');
const path = require('path');
const { readFileIfExists, ensureDirectories } = require('./fileUtils');
const { generateDiataxisContent } = require('./aiUtils');

const OUTPUT_DIRS = {
    'Tutorial': 'docs3/tutorials',
    'How-To': 'docs3/how-to',
    'Reference': 'docs3/reference',
    'Explanation': 'docs3/explanation',
    'Index': 'docs3'
};

function extractProjectDetails(rootReadme, configFiles) {
    let details = { overview: '', tools: [], setup: '', workflow: '', testing: '', monitoring: '', ci_cd: '' };
    const readmeContent = readFileIfExists(rootReadme);

    if (readmeContent) {
        details.overview = readmeContent.split('\\n')[0];
        details.setup = readmeContent.match(/## Local Environment Setup[\\s\\S]*?(?=##|$)/gi)?.[0] || '';
        details.workflow = readmeContent.match(/## How to work on the project[\\s\\S]*?(?=##|$)/gi)?.[0] || '';
        details.testing = readmeContent.match(/## Testing[\\s\\S]*?(?=##|$)/gi)?.[0] || '';
        details.monitoring = readmeContent.match(/## Monitoring and Logging[\\s\\S]*?(?=##|$)/gi)?.[0] || '';
        details.ci_cd = readmeContent.match(/## CI\/CD[\s\S]*?(?=##|$)/gi)?.[0] || '';



    }

    return details;
}

async function generateDiataxisDocs(rootReadme, configFiles) {
    ensureDirectories(Object.values(OUTPUT_DIRS));

    const projectDetails = extractProjectDetails(rootReadme, configFiles);
    const structuredDocs = await generateDiataxisContent(JSON.stringify(projectDetails, null, 2));

    const indexContent = `# Project Documentation Index\\n\\n## Introduction\\n${projectDetails.overview}\\n\\n## Tools Used\\n${projectDetails.tools.join(', ')}\\n\\n## Setup\\n${projectDetails.setup}\\n\\n## CI/CD\\n${projectDetails.ci_cd}\\n\\n## Available Modules and Themes:\\n`;

    fs.writeFileSync(path.join(OUTPUT_DIRS.Index, 'index.md'), indexContent);
    console.log('Diátaxis-based documentation with AI-enhanced insights generated.');
}

module.exports = { generateDiataxisDocs };
