const path = require('path');
const yaml = require('js-yaml');
const { readFileIfExists } = require('./fileUtils');

function extractDrupalEntities(configPath, pattern) {
    if (!fs.existsSync(configPath)) return [];
    return fs.readdirSync(configPath)
        .filter(file => file.match(pattern))
        .map(file => yaml.load(readFileIfExists(path.join(configPath, file))));
}

function extractContentTypes(modulePath) {
    return extractDrupalEntities(modulePath, /node\.type\..*\.yml$/);
}

function extractTaxonomies(modulePath) {
    return extractDrupalEntities(modulePath, /taxonomy\.vocabulary\..*\.yml$/);
}

module.exports = { extractContentTypes, extractTaxonomies };
