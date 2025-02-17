const fs = require('fs-extra');
const path = require('path');
const yaml = require('js-yaml');
const { readFileIfExists } = require('./fileUtils');

function analyzeModuleCode(modulePath) {
    let details = {
        dependencies: [],
        services: [],
        hooks: [],
        classes: [],
        functions: [],
        plugins: [],
        routes: [],
        permissions: [],
        schema: []
    };

    function walk(dir) {
        if (!fs.existsSync(dir)) return;
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                walk(fullPath);
            } else if (fullPath.endsWith('.php') || fullPath.endsWith('.module')) {
                const content = readFileIfExists(fullPath);
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
            } else if (fullPath.endsWith('.routing.yml')) {
                details.routes.push(fullPath.replace(modulePath + '/', ''));
            } else if (fullPath.endsWith('.permissions.yml')) {
                details.permissions.push(fullPath.replace(modulePath + '/', ''));
            } else if (fullPath.includes('/src/Plugin/')) {
                details.plugins.push(fullPath.replace(modulePath + '/', ''));
            } else if (fullPath.endsWith('.schema.yml')) {
                details.schema.push(fullPath.replace(modulePath + '/', ''));
            }
        }
    }
    walk(modulePath);
    return details;
}

function generateReadme(directory, category) {
    if (!fs.existsSync(directory)) return [];
    let generatedDocs = [];
    
    fs.readdirSync(directory).forEach(module => {
        const modulePath = path.join(directory, module);
        if (fs.statSync(modulePath).isDirectory()) {
            const infoFile = path.join(modulePath, `${module}.info.yml`);
            const servicesFile = path.join(modulePath, `${module}.services.yml`);
            const composerFile = path.join(modulePath, 'composer.json');
            const packageFile = path.join(modulePath, 'package.json');
            const readmeFile = path.join(modulePath, 'README.md');
            
            let moduleInfo = {};
            if (fs.existsSync(infoFile)) {
                try {
                    moduleInfo = yaml.load(readFileIfExists(infoFile));
                } catch (error) {
                    console.error(`Error parsing YAML: ${error.message}`);
                }
            }
            
            let services = [];
            if (fs.existsSync(servicesFile)) {
                try {
                    const serviceData = yaml.load(readFileIfExists(servicesFile));
                    services = Object.keys(serviceData || {});
                } catch (error) {
                    console.error(`Error parsing services YAML: ${error.message}`);
                }
            }
            
            let dependencies = [];
            if (fs.existsSync(composerFile)) {
                try {
                    const composerData = JSON.parse(readFileIfExists(composerFile));
                    dependencies.push(...Object.keys(composerData.dependencies || {}));
                } catch (error) {
                    console.error(`Error parsing composer.json: ${error.message}`);
                }
            }
            
            if (fs.existsSync(packageFile)) {
                try {
                    const packageData = JSON.parse(readFileIfExists(packageFile));
                    dependencies.push(...Object.keys(packageData.dependencies || {}));
                } catch (error) {
                    console.error(`Error parsing package.json: ${error.message}`);
                }
            }
            
            const codeAnalysis = analyzeModuleCode(modulePath);
            
            const readmeContent = `# ${moduleInfo.name || module} Module\n\n## Description\n${moduleInfo.description || 'No description available.'}\n\n## Dependencies\n${dependencies.length ? dependencies.map(dep => `- ${dep}`).join('\n') : 'No dependencies found.'}\n\n## Services\n${services.length ? services.map(srv => `- ${srv}`).join('\n') : 'No services defined.'}\n\n## Hooks Implemented\n${codeAnalysis.hooks.length ? codeAnalysis.hooks.map(h => `- ${h}`).join('\n') : 'No custom hooks implemented.'}\n\n## Main Classes & Implementations\n${codeAnalysis.classes.length ? codeAnalysis.classes.map(c => `- ${c}`).join('\n') : 'No specific classes detected.'}\n\n## Functions\n${codeAnalysis.functions.length ? codeAnalysis.functions.map(f => `- ${f}`).join('\n') : 'No specific functions detected.'}\n\n## Plugins\n${codeAnalysis.plugins.length ? codeAnalysis.plugins.map(p => `- ${p}`).join('\n') : 'No plugins found.'}\n\n## Routes\n${codeAnalysis.routes.length ? codeAnalysis.routes.map(r => `- ${r}`).join('\n') : 'No routes defined.'}\n\n## Permissions\n${codeAnalysis.permissions.length ? codeAnalysis.permissions.map(p => `- ${p}`).join('\n') : 'No permissions found.'}\n\n## Database Schema\n${codeAnalysis.schema.length ? codeAnalysis.schema.map(s => `- ${s}`).join('\n') : 'No schema defined.'}\n\n## Example Usage\nHere’s an example of how this module works:\n\n\`\`\`php\n// Example usage of the module functionality\ndrush en ${module};\ndrush cr;\n\`\`\`\n\nRefer to the documentation for more details.`;
            
            fs.writeFileSync(readmeFile, readmeContent);
            generatedDocs.push(module);
            console.log(`Generated README for ${category}: ${module}`);
        }
    });
    
    return generatedDocs;
}

module.exports = { generateReadme };
