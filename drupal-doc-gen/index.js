const { exec } = require('child_process');
const path = require('path');

// **Define Paths**
const PROJECT_ROOT = path.resolve(__dirname, '..');  // Moves up one level from drupal-doc-gen
const SCRIPT_DIR = __dirname; // drupal-doc-gen/utils/

// **Run a script and wait for it to complete**
function runScript(command, options = {}) {
    return new Promise((resolve, reject) => {
        console.log(`🚀 Running: ${command}...`);
        const process = exec(command, options);

        process.stdout.on('data', (data) => console.log(data.toString()));
        process.stderr.on('data', (data) => console.error(data.toString()));

        process.on('exit', (code) => {
            if (code === 0) {
                console.log(`✅ Finished: ${command}\n`);
                resolve();
            } else {
                reject(new Error(`❌ Failed: ${command} with exit code ${code}`));
            }
        });
    });
}

// **Sequential Execution of Scripts**
(async () => {
    try {
        await runScript('node utils/generateReadme.js', { cwd: SCRIPT_DIR });   // Step 1: Generate README
        await runScript('node drupal-doc-gen/utils/extractCoreInfo.js', { cwd: PROJECT_ROOT }); // Step 2: Extract Core Points
        await runScript('node utils/generateDocs.js', { cwd: SCRIPT_DIR });    // Step 3: Generate Documentation
        await runScript('node utils/organizeDocs.js', { cwd: SCRIPT_DIR });    // Step 4: Organize Documentation
        
        console.log("🎉 All tasks completed successfully!");
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
})();
