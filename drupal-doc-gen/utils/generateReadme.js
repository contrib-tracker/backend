const fs = require('fs-extra');
const path = require('path');
yaml = require('js-yaml');
const { readFileIfExists } = require('./fileUtils');
const { generateAiEnhancedReadme } = require('./aiUtils');

const API_REPORT_DIR = path.resolve(process.cwd(), '../docs/api-report');
const TEMP_DIR = path.resolve(process.cwd(), '../docs/temp');
fs.ensureDirSync(TEMP_DIR);

function findApiDocumentation(moduleName) {
    const normalizedModuleName = moduleName.replace(/_/g, '-');
    const possibleFiles = fs.readdirSync(API_REPORT_DIR).filter(file =>
        file.includes(moduleName) || file.includes(normalizedModuleName)
    );
    
    if (possibleFiles.length > 0) {
        return readFileIfExists(path.join(API_REPORT_DIR, possibleFiles[0]));
    }
    return '';
}

function analyzeModuleFiles(modulePath) {
    let details = {
        services: [],
        routes: [],
        permissions: [],
        schema: [],
        dependencies: [],
        analyzedFiles: []
    };

    function walk(dir) {
        if (!fs.existsSync(dir)) return;
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                walk(fullPath);
            } else {
                details.analyzedFiles.push(fullPath.replace(modulePath + '/', ''));
                if (fullPath.endsWith('.routing.yml')) {
                    details.routes.push(fullPath.replace(modulePath + '/', ''));
                } else if (fullPath.endsWith('.permissions.yml')) {
                    details.permissions.push(fullPath.replace(modulePath + '/', ''));
                } else if (fullPath.endsWith('.schema.yml')) {
                    details.schema.push(fullPath.replace(modulePath + '/', ''));
                } else if (fullPath.endsWith('.services.yml')) {
                    try {
                        const serviceData = yaml.load(readFileIfExists(fullPath));
                        details.services = Object.keys(serviceData || {});
                    } catch (error) {
                        console.error(`Error parsing services YAML: ${error.message}`);
                    }
                } else if (fullPath.endsWith('composer.json')) {
                    try {
                        const composerData = JSON.parse(readFileIfExists(fullPath));
                        details.dependencies = Object.keys(composerData.require || {});
                    } catch (error) {
                        console.error(`Error parsing composer.json: ${error.message}`);
                    }
                }
            }
        }
    }
    walk(modulePath);
    return details;
}

async function generateReadme(directory) {
    if (!fs.existsSync(directory)) return [];
    let generatedDocs = [];
    
    fs.readdirSync(directory).forEach(async (module) => {
        const modulePath = path.join(directory, module);
        if (fs.statSync(modulePath).isDirectory()) {
            const infoFile = path.join(modulePath, `${module}.info.yml`);
            const composerFile = path.join(modulePath, 'composer.json');
            const apiDocumentation = findApiDocumentation(module);
            const tempFile = path.join(TEMP_DIR, `${module}.txt`);
            const readmeFile = path.join(API_REPORT_DIR, `${module}-README.md`);
            
            let moduleInfo = {};
            if (fs.existsSync(infoFile)) {
                try {
                    moduleInfo = yaml.load(readFileIfExists(infoFile));
                } catch (error) {
                    console.error(`Error parsing YAML: ${error.message}`);
                }
            }
            
            const moduleDetails = analyzeModuleFiles(modulePath);
            
            const combinedContent = `Module: ${moduleInfo.name || module}\n\n` +
                `Description: ${moduleInfo.description || 'No description available.'}\n\n` +
                `API Documentation:\n\n${apiDocumentation}\n\n` +
                `## Services\n${moduleDetails.services.length ? moduleDetails.services.map(srv => `- ${srv}`).join('\n') : 'No services defined.'}\n\n` +
                `## Routes\n${moduleDetails.routes.length ? moduleDetails.routes.map(r => `- ${r}`).join('\n') : 'No routes found.'}\n\n` +
                `## Permissions\n${moduleDetails.permissions.length ? moduleDetails.permissions.map(p => `- ${p}`).join('\n') : 'No permissions found.'}\n\n` +
                `## Database Schema\n${moduleDetails.schema.length ? moduleDetails.schema.map(s => `- ${s}`).join('\n') : 'No schema defined.'}\n\n` +
                `## Dependencies\n${moduleDetails.dependencies.length ? moduleDetails.dependencies.map(dep => `- ${dep}`).join('\n') : 'No dependencies found.'}\n\n`;
            
            fs.writeFileSync(tempFile, combinedContent);
            console.log(`Generated temporary file for ${module}`);
            
            const structuredDocumentation = await generateAiEnhancedReadme(combinedContent, [
                "Installation", "Usage", "Configuration", "API", "Examples",
                "Dependencies", "Known Issues", "Contributing", "Changelog", "License"
            ]);
            fs.writeFileSync(readmeFile, structuredDocumentation);
            generatedDocs.push(module);
            console.log(`Generated README for ${module} under api-report`);
        }
    });
    
    return generatedDocs;
}

module.exports = { generateReadme };
