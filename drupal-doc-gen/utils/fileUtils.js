const fs = require('fs-extra');
const path = require('path');

function readFileIfExists(filePath) {
    try {
        return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error.message);
        return '';
    }
}

function ensureDirectories(directories) {
    directories.forEach(dir => fs.ensureDirSync(dir));
}

module.exports = { readFileIfExists, ensureDirectories };
