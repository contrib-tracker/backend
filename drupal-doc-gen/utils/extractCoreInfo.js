const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const { readFileIfExists } = require('./fileUtils');
const { generateCorePoints } = require('./aiUtils'); // New AI function

const OUTPUT_FILE = 'core_info.json';

const FILE_SOURCES = {
    "Tools and Pre-requisites": ["README.md", "composer.json", ".lando.yml", "docker-compose.yml", ".github/workflows/*.yml"],
    "Local Environment Setup": ["README.md", ".lando.yml", "docker-compose.yml", "web/sites/example.settings.local.php"],
    "How to Work on This Project": ["README.md", "CONTRIBUTING.md", ".github/workflows/*.yml"],
    "Content Structure": ["/config/sync/*", "web/modules/custom/*/README.md", "web/themes/custom/*/README.md"],
    "Custom Modules and Themes": ["web/modules/custom/*/README.md", "web/themes/custom/*/README.md", "composer.json"],
    "Testing": ["/tests/*", "/core/tests/*", ".github/workflows/*.yml"],
    "Monitoring and Logging": ["/config/sync/system.logging.yml", "web/sites/default/settings.php", "web/sites/default/settings.local.php", "sentry.settings.yml"],
    "CI/CD": [".github/workflows/*.yml", ".gitlab-ci.yml", "Jenkinsfile", "bitbucket-pipelines.yml"]
};

// Extract core points using AI
async function extractProjectDetails() {
    let details = {};
    let missingFiles = [];

    for (const [category, files] of Object.entries(FILE_SOURCES)) {
        details[category] = [];

        for (const filePattern of files) {
            let matchingFiles = glob.sync(filePattern, { nodir: true });

            if (matchingFiles.length === 0) {
                missingFiles.push(filePattern);
            }

            for (const file of matchingFiles) {
                const content = readFileIfExists(file);
                if (!content.trim()) continue;

                console.log(`🧠 Extracting core points from ${file} using AI...`);
                const extractedPoints = await generateCorePoints(file, content);
                
                if (extractedPoints) {
                    details[category].push({ file, extractedPoints });
                }
            }
        }
    }

    if (missingFiles.length > 0) {
        console.warn("⚠️ Warning: Some expected files were not found:", missingFiles.join(", "));
    }

    return details;
}

// Save extracted details into core_info.json
async function saveExtractedInfo() {
    const projectDetails = await extractProjectDetails();

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(projectDetails, null, 2));
    console.log(`✅ Core project information extracted and saved in '${OUTPUT_FILE}'`);
}

saveExtractedInfo();
