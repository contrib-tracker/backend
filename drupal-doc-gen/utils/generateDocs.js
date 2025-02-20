const fs = require('fs-extra');
const path = require('path');
const { generateDiataxisContent } = require('./aiUtils');

const CORE_INFO_FILE = 'core_info.json';
const OUTPUT_DIR = 'docs';

// Ensure the `docs/` directory exists
fs.ensureDirSync(OUTPUT_DIR);

// **Mapping core points to meaningful documentation files**
const DOC_STRUCTURE = {
    "tools-and-prerequisites.md": ["Tools and Pre-requisites"],
    "local-environment-setup.md": ["Local Environment Setup"],
    "how-to-work-on-project.md": ["How to Work on This Project"],
    "content-structure.md": ["Content Structure"],
    "custom-modules-and-themes.md": ["Custom Modules and Themes"],
    "testing-strategy.md": ["Testing"],
    "monitoring-and-logging.md": ["Monitoring and Logging"],
    "ci-cd-process.md": ["CI/CD"]
};

// Decide which documentation files to create based on extracted core points
function determineDocumentationFiles(coreInfo) {
    let documentationFiles = {};

    Object.entries(DOC_STRUCTURE).forEach(([docFile, categories]) => {
        let content = `# ${docFile.replace(/-/g, ' ').replace('.md', '')}\n\n`;

        categories.forEach(category => {
            if (coreInfo[category]) {
                coreInfo[category].forEach(item => {
                    content += `### From ${item.file}\n${item.extractedPoints}\n\n`;
                });
            }
        });

        documentationFiles[docFile] = content;
    });

    return documentationFiles;
}

// Create meaningful documentation files with extracted content
function createDocumentationFiles(documentationFiles) {
    Object.entries(documentationFiles).forEach(([fileName, content]) => {
        const filePath = path.join(OUTPUT_DIR, fileName);
        fs.writeFileSync(filePath, content);
        console.log(`📄 Created: ${filePath}`);
    });
}

// Refine documentation files using AI
async function refineDocumentationWithAI() {
    const files = fs.readdirSync(OUTPUT_DIR);
    for (const file of files) {
        const filePath = path.join(OUTPUT_DIR, file);
        let content = fs.readFileSync(filePath, 'utf8');

        console.log(`🧠 Enhancing ${filePath} with AI...`);
        const enhancedContent = await generateDiataxisContent(content);

        fs.writeFileSync(filePath, enhancedContent);
        console.log(`✅ AI-enhanced content saved: ${filePath}`);
    }
}

// Main function to generate documentation
async function generateDocs() {
    if (!fs.existsSync(CORE_INFO_FILE)) {
        console.error(`❌ Missing core information file: ${CORE_INFO_FILE}`);
        return;
    }

    const coreInfo = JSON.parse(fs.readFileSync(CORE_INFO_FILE, 'utf8'));

    console.log("📄 Determining meaningful documentation files...");
    const documentationFiles = determineDocumentationFiles(coreInfo);

    console.log("📝 Creating structured documentation files...");
    createDocumentationFiles(documentationFiles);

    console.log("🚀 Enhancing documentation using AI...");
    await refineDocumentationWithAI();

    console.log("🎉 Project documentation successfully generated and refined.");
}

generateDocs();
