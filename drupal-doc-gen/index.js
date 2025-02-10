const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');

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
    'Tutorial': 'docs/tutorials',
    'How-To': 'docs/how-to',
    'Reference': 'docs/reference',
    'Explanation': 'docs/explanation',
    'Misc': 'docs/misc'
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

// Recursively walk through directories and collect all README.md files
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

            // Skip node_modules, vendor, and contrib directories
            if (file === 'node_modules' || file === 'vendor' || file === 'contrib') {
                console.log(`Skipping directory: ${fullPath}`);
                continue;
            }

            if (fs.statSync(fullPath).isDirectory()) {
                walk(fullPath);  // Recursively walk through subdirectories
            } else if (file.toLowerCase() === 'readme.md') {
                readmeFiles.push(fullPath);
                console.log(`Found README: ${fullPath}`);
            }
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

// Truncate long content for better classification (adjust as needed)
function truncateContent(content, maxLength = 2000) {
    if (content.length > maxLength) {
        return content.substring(0, maxLength) + '... [Content truncated]';
    }
    return content;
}

// Function to classify content and extract structured information using OpenRouter
async function classifyDocumentation(content) {
    try {
        const truncatedContent = truncateContent(content);
        const prompt = `You are a documentation assistant using the Diátaxis framework. The content provided is a README or project-related file. Please do the following:

1. Classify the content as one of the following categories: Tutorial, How-To, Reference, or Explanation.
2. Provide a 1-2 sentence summary of the content.
3. Identify key sections like "Overview," "Usage," "Dependencies," and "Examples" if available.

Your response must be structured as follows:

Category: [One of Tutorial, How-To, Reference, Explanation]  
Summary: [A brief summary]  
Overview: [Key points or first section from the README]  
Usage: [Any usage instructions found in the README]  
Dependencies: [List any dependencies if mentioned]  
Examples: [List examples if any are present]  

Content:  
${truncatedContent}`;

        const response = await axios.post(
            API_BASE_URL,
            {
                model: MODEL,
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                extra_body: {}
            },
            {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        if (response.data && response.data.choices && response.data.choices[0]) {
            return response.data.choices[0].message.content.trim();
        }

        console.warn('Unexpected response format or empty response:', response.data);
        return 'Could not classify this content automatically.';
    } catch (error) {
        console.error('Error classifying documentation:', error.response?.data || error.message);
        return 'Could not classify this content due to an API error.';
    }
}

// Function to generate the appropriate file name based on the Diátaxis category and source name
function generateFileName(category, sourceName) {
    const sanitizedSourceName = sourceName.replace(/[^a-zA-Z0-9_-]/g, '_').toLowerCase();
    return `${sanitizedSourceName}_${category.toLowerCase()}.md`;
}

// Function to save generated documentation to the appropriate directory
function saveDocumentation(type, content, fileName) {
    const targetDir = OUTPUT_DIRS[type] || OUTPUT_DIRS['Misc'];
    fs.outputFileSync(path.join(targetDir, fileName), content);
}

// Main function to generate documentation
async function generateDocumentation() {
    const { rootReadme, packageJson, composerJson } = readProjectFiles();
    const contentSources = [
        { name: 'Project README', content: rootReadme },
        ...readAllReadmeFiles()
    ];

    // Ensure output directories exist
    Object.values(OUTPUT_DIRS).forEach(dir => {
        fs.ensureDirSync(dir);
    });

    const dependenciesSummary = extractDependencies(packageJson, composerJson);

    // Process files concurrently
    await Promise.all(contentSources.map(async (source) => {
        try {
            const classificationResult = await classifyDocumentation(source.content);
            const output = `# ${source.name}

${classificationResult}

---

**Dependencies and Tools:**

${dependenciesSummary}

---

**Original README Content:**

${source.content}`;
            const category = classificationResult.match(/Category:\s*(.*)/i)?.[1] || 'Misc';
            const fileName = generateFileName(category, source.name);
            saveDocumentation(category, output, fileName);
            console.log(`Generated documentation for ${source.name} -> ${category}`);
        } catch (error) {
            console.error(`Error processing ${source.name}:`, error.message);
        }
    }));

    console.log('Documentation generation complete!');
}

// Run the main function
generateDocumentation();
