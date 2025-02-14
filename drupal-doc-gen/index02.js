const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');
const crypto = require('crypto');

// Load environment variables
require('dotenv').config();
console.log('Using API Key:', process.env.OPENROUTER_API_KEY ? '***' : 'Not found');

// Configuration
const API_BASE_URL = process.env.OPENROUTER_API_BASE_URL || 'https://openrouter.ai/api/v1/chat/completions';
const API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = process.env.OPENROUTER_MODEL || 'google/gemini-2.0-flash-001';
const CUSTOM_DIRS = [
    path.resolve(process.cwd(), '../web/modules/custom'),
    path.resolve(process.cwd(), '../web/themes/custom')
];
const OUTPUT_DIRS = {
    'Tutorial': 'docs1/tutorials',
    'How-To': 'docs1/how-to',
    'Reference': 'docs1/reference',
    'Explanation': 'docs1/explanation',
    'Index': 'docs1'
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

// Recursively collect all README.md files
function collectReadmeFiles(directory) {
    let readmeFiles = [];
    function walk(dir) {
        if (!fs.existsSync(dir)) {
            console.warn(`Directory not found: ${dir}`);
            return;
        }
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const fullPath = path.join(dir, file);
            if (file === 'node_modules' || file === 'vendor' || file === 'contrib') continue;
            if (fs.statSync(fullPath).isDirectory()) walk(fullPath);
            else if (file.toLowerCase() === 'readme.md') readmeFiles.push(fullPath);
        }
    }
    walk(directory);
    return readmeFiles;
}

// Read and return the content of all README.md files
function readAllReadmeFiles() {
    let readmeContents = [];
    for (const dir of CUSTOM_DIRS) {
        console.log(`Scanning directory: ${dir}`);
        const readmeFiles = collectReadmeFiles(dir);
        for (const readmeFile of readmeFiles) {
            const content = readFileIfExists(readmeFile);
            console.log(`Reading README: ${readmeFile} - Length: ${content.length}`);
            readmeContents.push({ name: path.basename(path.dirname(readmeFile)), content });
        }
    }
    return readmeContents;
}

// Read the root README.md and major configuration files (package.json, composer.json)
function readProjectFiles() {
    const rootReadmePath = path.resolve(process.cwd(), '../README.md');
    const rootReadme = readFileIfExists(rootReadmePath);
    const packageJsonPath = path.resolve(process.cwd(), '../package.json');
    const composerJsonPath = path.resolve(process.cwd(), '../composer.json');

    const packageJson = readFileIfExists(packageJsonPath);
    const composerJson = readFileIfExists(composerJsonPath);

    return { rootReadme, packageJson, composerJson };
}

// Enhanced prompt for AI to classify and generate structured documentation
async function classifyAndGenerateDocumentation(source) {
    const truncatedContent = source.content.length > 2000 ? source.content.slice(0, 2000) + '... [truncated]' : source.content;
    const prompt = `You are tasked with generating structured documentation using the Diátaxis framework for the provided project source:

Source: ${source.name}

Analyze the content and generate appropriate documentation under one of the following categories: Tutorial, How-To Guide, Reference, or Explanation.

Format the response as follows:

Category: [One of Tutorial, How-To, Reference, Explanation]
Title: [Title of the documentation]
Content:
[The structured content for this section]

Project Content:
${truncatedContent}`;

    try {
        const response = await axios.post(
            API_BASE_URL,
            { model: MODEL, messages: [{ role: 'user', content: prompt }] },
            { headers: { 'Authorization': `Bearer ${API_KEY}`, 'Content-Type': 'application/json' } }
        );

        const result = response.data.choices[0].message.content.trim();

        const categoryMatch = result.match(/Category:\s*(.*)/i)?.[1]?.trim();
        const titleMatch = result.match(/Title:\s*(.*)/i)?.[1]?.trim();
        const contentMatch = result.split(/Content:/i)[1]?.trim();

        if (categoryMatch && titleMatch && contentMatch) {
            return { category: categoryMatch, title: titleMatch, content: contentMatch };
        } else {
            throw new Error('Unexpected response format');
        }
    } catch (error) {
        console.error('Error generating documentation:', error.message);
        return null;
    }
}

// Enhanced filename generator
function generateFileName(title, category) {
    const sanitizedTitle = title.replace(/[^a-zA-Z0-9_-]/g, '_').toLowerCase();
    const hash = crypto.createHash('md5').update(title).digest('hex').slice(0, 6);
    return `${sanitizedTitle}_${category.toLowerCase()}_${hash}.md`;
}

// Generate the documentation index page
function generateIndexPage(documentationLinks) {
    const intro = `# Project Documentation Index

This is the main index page for the project documentation, organized using the Diátaxis framework.

Navigate to the specific sections below for more details:
`;
    const linksList = documentationLinks.map(({ category, title, fileName }) => `- **[${title} (${category})](${fileName})**`).join('\n');
    return `${intro}
${linksList}`;
}

// Save content to the appropriate directory
function saveDocumentation(type, title, content) {
    const targetDir = OUTPUT_DIRS[type] || OUTPUT_DIRS['Index'];
    const fileName = generateFileName(title, type);
    fs.outputFileSync(path.join(targetDir, fileName), content);
    return fileName;
}

// Extract dependencies or tools from package.json and composer.json
function extractDependencies(packageJsonContent, composerJsonContent) {
    let dependencies = [];

    if (packageJsonContent) {
        try {
            const packageJson = JSON.parse(packageJsonContent);
            dependencies.push('**NPM Dependencies:**');
            for (const [dep, version] of Object.entries(packageJson.dependencies || {})) {
                dependencies.push(`- ${dep}: ${version}`);
            }
            dependencies.push('**Development Dependencies:**');
            for (const [dep, version] of Object.entries(packageJson.devDependencies || {})) {
                dependencies.push(`- ${dep}: ${version}`);
            }
        } catch (error) {
            console.error('Error parsing package.json:', error.message);
        }
    }

    if (composerJsonContent) {
        try {
            const composerJson = JSON.parse(composerJsonContent);
            dependencies.push('**Composer Dependencies:**');
            for (const [dep, version] of Object.entries(composerJson.require || {})) {
                dependencies.push(`- ${dep}: ${version}`);
            }
            dependencies.push('**Composer Development Dependencies:**');
            for (const [dep, version] of Object.entries(composerJson['require-dev'] || {})) {
                dependencies.push(`- ${dep}: ${version}`);
            }
        } catch (error) {
            console.error('Error parsing composer.json:', error.message);
        }
    }

    return dependencies.join('\n');
}

// Main function to generate structured documentation
async function generateDocumentation() {
    const { rootReadme, packageJson, composerJson } = readProjectFiles();
    const contentSources = [
        { name: 'Project README', content: rootReadme },
        ...readAllReadmeFiles()
    ];
    const dependenciesSummary = extractDependencies(packageJson, composerJson);

    let documentationLinks = [];

    for (const source of contentSources) {
        const docResult = await classifyAndGenerateDocumentation(source);
        if (docResult) {
            const { category, title, content } = docResult;
            const fullContent = `# ${title}

${content}

---

**Dependencies and Tools:**

${dependenciesSummary}

---

**Original Source:** ${source.name}`;
            const fileName = saveDocumentation(category, title, fullContent);
            documentationLinks.push({ category, title, fileName });
        }
    }

    // Generate and save the index page
    const indexPageContent = generateIndexPage(documentationLinks);
    saveDocumentation('Index', 'index', indexPageContent);

    console.log('Documentation generation complete!');
}

generateDocumentation();
