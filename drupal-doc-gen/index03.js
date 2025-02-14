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
const OUTPUT_DIRS = {
    'Tutorial': 'docs3/tutorials',
    'How-To': 'docs3/how-to',
    'Reference': 'docs3/reference',
    'Explanation': 'docs3/explanation',
    'Index': 'docs3'
};

// Utility function to read files if they exist
function readFileIfExists(filePath) {
    try {
        return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error.message);
        return '';
    }
}

// Extract module-specific details from its source code
function analyzeModuleCode(modulePath) {
    let details = {
        plugins: [],
        queueWorkers: [],
        services: [],
        hooks: [],
        classes: [],
        functions: []
    };

    function walk(dir) {
        if (!fs.existsSync(dir)) return;
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                walk(fullPath);
            } else if (fullPath.endsWith('.php')) {
                const content = readFileIfExists(fullPath);
                if (/\@ContributionSource/.test(content)) {
                    details.plugins.push(fullPath.replace(modulePath + '/', ''));
                }
                if (/implements QueueWorkerBase/.test(content)) {
                    details.queueWorkers.push(fullPath.replace(modulePath + '/', ''));
                }
                if (/services\.yml/.test(fullPath)) {
                    details.services.push(fullPath.replace(modulePath + '/', ''));
                }
                if (/hook_/.test(content)) {
                    details.hooks.push(fullPath.replace(modulePath + '/', ''));
                }
                const classMatches = content.match(/class\s+([A-Za-z0-9_]+)/g);
                if (classMatches) {
                    classMatches.forEach(cls => details.classes.push(cls.replace('class ', '')));
                }
                const functionMatches = content.match(/function\s+([A-Za-z0-9_]+)/g);
                if (functionMatches) {
                    functionMatches.forEach(fn => details.functions.push(fn.replace('function ', '')));
                }
            }
        }
    }

    walk(modulePath);
    return details;
}

// Generate README files for custom Drupal modules
function generateModuleReadmes() {
    if (!fs.existsSync(CUSTOM_MODULES_DIR)) {
        console.warn(`Custom modules directory not found: ${CUSTOM_MODULES_DIR}`);
        return [];
    }

    const moduleDirs = fs.readdirSync(CUSTOM_MODULES_DIR).filter(dir => {
        return fs.statSync(path.join(CUSTOM_MODULES_DIR, dir)).isDirectory();
    });

    let generatedReadmes = [];
    
    moduleDirs.forEach(module => {
        const modulePath = path.join(CUSTOM_MODULES_DIR, module);
        const infoFilePath = path.join(modulePath, `${module}.info.yml`);
        const readmePath = path.join(modulePath, 'README.md');
        
        if (fs.existsSync(readmePath)) {
            console.log(`README already exists for module: ${module}`);
            return;
        }
        
        let moduleInfo = {};
        if (fs.existsSync(infoFilePath)) {
            try {
                moduleInfo = yaml.load(fs.readFileSync(infoFilePath, 'utf8'));
            } catch (error) {
                console.error(`Error parsing ${infoFilePath}:`, error.message);
            }
        }
        
        const codeAnalysis = analyzeModuleCode(modulePath);
        
        const readmeContent = `# ${moduleInfo.name || module} Module

` +
            `## Description
${moduleInfo.description || 'No description available.'}

` +
            `## Table of Contents
[[_TOC_]]

` +
            `## Introduction
${moduleInfo.description || 'This module provides functionality for Drupal integration.'}

` +
            `## Usage
This module contains the following key functionalities:

${codeAnalysis.functions.length ? codeAnalysis.functions.map(f => `- Function: ${f}`).join('\n') : 'No specific functions detected.'}

` +
            `## Plugin Implementation
${codeAnalysis.plugins.length ? codeAnalysis.plugins.map(p => `- ${p}`).join('\n') : 'No custom plugins found.'}

` +
            `## Queue Workers
${codeAnalysis.queueWorkers.length ? codeAnalysis.queueWorkers.map(q => `- ${q}`).join('\n') : 'No queue workers found.'}

` +
            `## Services & API
${codeAnalysis.services.length ? codeAnalysis.services.map(s => `- ${s}`).join('\n') : 'No services defined.'}

` +
            `## Hooks Implemented
${codeAnalysis.hooks.length ? codeAnalysis.hooks.map(h => `- ${h}`).join('\n') : 'No custom hooks implemented.'}

` +
            `## Main Classes & Implementations
${codeAnalysis.classes.length ? codeAnalysis.classes.map(c => `- ${c}`).join('\n') : 'No specific classes detected.'}

` +
            `## Example Usage
Here’s an example of how this module works:

\`\`\`php
// Example usage of the module functionality
drush en ${module};
drush cr;
\`\`\`

Refer to the documentation for more details.

`;
        
        fs.writeFileSync(readmePath, readmeContent);
        generatedReadmes.push({ name: module, content: readmeContent });
        console.log(`Generated README for module: ${module}`);
    });

    return generatedReadmes;
}

// Main function to generate structured documentation
async function generateDocumentation() {
    const generatedReadmes = generateModuleReadmes();
    console.log('Custom module README generation complete.');
}

generateDocumentation();
