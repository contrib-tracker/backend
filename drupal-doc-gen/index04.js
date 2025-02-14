const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');
const crypto = require('crypto');
const yaml = require('js-yaml');
const { parse } = require('comment-parser');

// Load environment variables
require('dotenv').config();
console.log('Using API Key:', process.env.OPENROUTER_API_KEY ? '***' : 'Not found');

// Configuration
const API_BASE_URL = process.env.OPENROUTER_API_BASE_URL || 'https://openrouter.ai/api/v1/chat/completions';
const API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = process.env.OPENROUTER_MODEL || 'google/gemini-2.0-flash-001';
const CUSTOM_MODULES_DIR = path.resolve(process.cwd(), '../web/modules/custom');
const THEMES_DIR = path.resolve(process.cwd(), '../web/themes/custom');
const ROOT_README = path.resolve(process.cwd(), '../README.md');
const CONFIG_FILES = [
    path.resolve(process.cwd(), '../composer.json'),
    path.resolve(process.cwd(), '../package.json'),
    path.resolve(process.cwd(), '../.github/workflows/ci.yml'),
    path.resolve(process.cwd(), '../phpunit.xml'),
    path.resolve(process.cwd(), '../docker-compose.yml')
];
const OUTPUT_DIRS = {
    'Tutorial': 'docs3/tutorials',
    'How-To': 'docs3/how-to',
    'Reference': 'docs3/reference',
    'Explanation': 'docs3/explanation',
    'Index': 'docs3'
};

// Ensure output directories exist
Object.values(OUTPUT_DIRS).forEach(dir => fs.ensureDirSync(dir));

// Utility function to read files if they exist
function readFileIfExists(filePath) {
    try {
        return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error.message);
        return '';
    }
}

// Extract key project insights from README and config files
function extractProjectDetails() {
    let details = { overview: '', tools: [], setup: '', workflow: '', testing: '', monitoring: '', ci_cd: '' };
    const readmeContent = readFileIfExists(ROOT_README);
    
    if (readmeContent) {
        details.overview = readmeContent.split('\n')[0]; // First line as project title
        details.setup = readmeContent.match(/## Local Environment Setup[\s\S]*?(?=##|$)/gi)?.[0] || '';
        details.workflow = readmeContent.match(/## How to work on the project[\s\S]*?(?=##|$)/gi)?.[0] || '';
        details.testing = readmeContent.match(/## Testing[\s\S]*?(?=##|$)/gi)?.[0] || '';
        details.monitoring = readmeContent.match(/## Monitoring and Logging[\s\S]*?(?=##|$)/gi)?.[0] || '';
        details.ci_cd = readmeContent.match(/## CI\/CD[\s\S]*?(?=##|$)/gi)?.[0] || '';
    }
    
    CONFIG_FILES.forEach(filePath => {
        const content = readFileIfExists(filePath);
        if (filePath.endsWith('composer.json') || filePath.endsWith('package.json')) {
            try {
                const jsonData = JSON.parse(content);
                if (jsonData.dependencies) {
                    details.tools.push(...Object.keys(jsonData.dependencies));
                }
            } catch (error) {
                console.error(`Error parsing JSON file ${filePath}:`, error.message);
            }
        }
        if (filePath.endsWith('phpunit.xml')) {
            details.testing += '\n- PHPUnit detected for testing';
        }
        if (filePath.endsWith('docker-compose.yml')) {
            details.tools.push('Docker');
        }
    });
    return details;
}

// Generate README files for custom modules and themes
function generateReadme(directory, category) {
    if (!fs.existsSync(directory)) return [];
    let generatedDocs = [];
    
    fs.readdirSync(directory).forEach(module => {
        const modulePath = path.join(directory, module);
        if (fs.statSync(modulePath).isDirectory()) {
            const infoFile = path.join(modulePath, `${module}.info.yml`);
            const readmeFile = path.join(modulePath, 'README.md');
            
            // Read module info
            let moduleInfo = {};
            if (fs.existsSync(infoFile)) {
                try {
                    moduleInfo = yaml.load(readFileIfExists(infoFile));
                } catch (error) {
                    console.error(`Error parsing YAML: ${error.message}`);
                }
            }
            
            const readmeContent = `# ${moduleInfo.name || module} Module\n\n## Description\n${moduleInfo.description || 'No description available.'}\n\n## Usage\nRefer to documentation for detailed usage.`;
            
            fs.writeFileSync(readmeFile, readmeContent);
            generatedDocs.push(module);
            console.log(`Generated README for ${category}: ${module}`);
        }
    });
    
    return generatedDocs;
}

// Generate structured Diátaxis documentation and index file
async function generateDiataxisDocs() {
    const projectDetails = extractProjectDetails();
    const structuredDocs = await generateDiataxisContent(JSON.stringify(projectDetails, null, 2));
    
    const indexContent = `# Project Documentation Index\n\n## Introduction\n${projectDetails.overview}\n\n## Tools Used\n${projectDetails.tools.join(', ')}\n\n## Setup\n${projectDetails.setup}\n\n## CI/CD\n${projectDetails.ci_cd}\n\n## Available Modules and Themes:\n`;
    
    fs.writeFileSync(path.join(OUTPUT_DIRS.Index, 'index.md'), indexContent);
    generateReadme(CUSTOM_MODULES_DIR, 'module');
    generateReadme(THEMES_DIR, 'theme');
    console.log('Diátaxis-based documentation with AI-enhanced insights generated.');
}

// Run script
generateDiataxisDocs();
