const fs = require('fs-extra');
const path = require('path');

const SOURCE_DIR = 'docs';
const OUTPUT_DIRS = {
    'Tutorial': 'docs_final/tutorials',
    'How-To': 'docs_final/how-to',
    'Reference': 'docs_final/reference',
    'Explanation': 'docs_final/explanation'
};

// Ensure output directories exist
function ensureOutputDirectories() {
    Object.values(OUTPUT_DIRS).forEach(dir => fs.ensureDirSync(dir));
}

// Categorize documentation files based on their content
function categorizeDocumentationFiles() {
    const files = fs.readdirSync(SOURCE_DIR);
    let categorizedFiles = { Tutorial: [], 'How-To': [], Reference: [], Explanation: [] };

    files.forEach(file => {
        const filePath = path.join(SOURCE_DIR, file);
        const content = fs.readFileSync(filePath, 'utf8');

        if (content.includes('## Step-by-Step Guide')) {
            categorizedFiles.Tutorial.push(file);
        } else if (content.includes('## How To')) {
            categorizedFiles['How-To'].push(file);
        } else if (content.includes('## API Reference') || content.includes('## Configuration')) {
            categorizedFiles.Reference.push(file);
        } else {
            categorizedFiles.Explanation.push(file);
        }
    });

    return categorizedFiles;
}

// Move files into the correct Diátaxis categories
function moveFilesToCategories(categorizedFiles) {
    Object.entries(categorizedFiles).forEach(([category, files]) => {
        files.forEach(file => {
            const srcPath = path.join(SOURCE_DIR, file);
            const destPath = path.join(OUTPUT_DIRS[category], file);
            fs.moveSync(srcPath, destPath);
            console.log(`📂 Moved ${file} to ${category}`);
        });
    });
}

// Main function
function organizeDocs() {
    console.log("📂 Organizing documentation into Diátaxis structure...");
    ensureOutputDirectories();

    const categorizedFiles = categorizeDocumentationFiles();
    moveFilesToCategories(categorizedFiles);

    console.log("🎉 Documentation successfully structured into Diátaxis categories.");
}

organizeDocs();
