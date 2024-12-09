# Contrib Tracker Automated Functional and Visual Regression Testing

This project aims to facilitate automated functional and visual regression checklists in the pipeline, reducing testing time and preventing production deployment issues.

## File Structure

* Config file - `cypress.config.js`
* Dependency file - `package.json`
* Test files - `(.cypress/e2e/)`
* Support files - `(.cypress/support)`
* Test data files - `(.cypress/fixtures)`

## Prerequisites

* npm and node js

## Usage

1. **Clone the repository:**

   `git clone https://github.com/contrib-tracker/backend.git`

2. **Install the required dependencies:**

   `cd web/themes/custom/contribtracker && ddev npm i` (*The test project is under contrib-tracker directory*)

3. **Run the script:**

   The project is divided into separate modules for functional and visual testing. Each module can be used independently by running the following commands:

   * `npm run functional-prod` (*To run functional tests on prod env*)

   * `npm run vr-dev` (*To run visual tests on dev env*)

   For more details about custom scripts, please refer to the `package.json` file.

4. **Test Scripts and Tagging**

   We maintain a comprehensive set of test scripts to validate functionality, security, and performance across the application. These scripts are modular, reusable, and categorized to cover different testing scenarios effectively.

   To further enhance the flexibility and organization of these scripts, we use **CypressGrep**, a powerful library for tagging and filtering tests. Tagging allows developers to focus on specific subsets of tests, enabling efficient execution tailored to the current requirements.

   **Tagging Test Scripts**

   Test scripts are categorized using tags such as `critical-path`, `security`, and `expensive`, which provide the following benefits:

   * **Selective Execution**: Run only the tests relevant to a feature or scenario.
   * **Efficient Debugging**: Exclude resource-intensive tests (`expensive`) during development.
   * **Targeted Coverage**: Combine or exclude tags for precise control over the test suite.

   Tags are integrated seamlessly with CypressGrep, ensuring smooth execution both locally and in CI environments.

   **Tag Names**

   While custom tags can be defined to suit project needs, the following are commonly used tags:

   * **critical-path**: For tests that verify core functionalities essential for system stability.

   * **security**: For tests that validate security mechanisms (e.g., input sanitization, access control).

   * **expensive**: For resource-intensive tests that require selective execution.

   * **regression**: For tests ensuring that existing features remain functional after changes.

   * **performance**: For tests measuring system performance under various conditions.

   **Adding Tags to Test Scripts**

   To add tags to your test scripts, use the `tags` property in the test definition:

   ```javascript
   describe('Test Script Title', { tags: ['tag-name 1', 'tag-name 2'] }, () => {
      // test script code goes here
   });
   ```

   **Running Tagged Tests**

   Tagged tests can be filtered and executed using the following commands:

   * Run tests tagged as `critical-path`:

   ```bash
   npx cypress run --env grepTags=critical-path
   ```

   * Combine multiple  tags:

   ```bash
   npx cypress run --env grepTags="critical-path,security"
   ```

   * Exclude specific tags:

   ```bash
   npx cypress run --env grepTags="-expensive"
   ```

   **Integration in CI/CD**

   In our CI pipeline, tagged tests are executed using specific workflows. For instance:

   * **Excluding expensive tests**:

   ```yaml
   - name: Cypress Test (excluding expensive tests)
      run: ddev cypress-run --env grepTags=-expensive
   ```

   * **Running expensive tests (scheduled)**:

   ```yaml
   - name: Run Expensive Tests
      run: ddev cypress-run --env grepTags=expensive
   ```

   We can have a separate workflow file for expensive or scheduled test script runs.

## Reporting

   We ensure transparency and actionable insights from test executions using automated reporting tools integrated with our CI pipeline. These reports provide a summary of tests executed, including totals for passed, failed, and skipped tests, along with a breakdown by tags (e.g., critical-path, security). For failed tests, detailed failure logs, including error messages, stack traces, screenshots, and videos, are generated to aid in debugging and resolution.

Feel free to customize the script to suit your specific requirements :)
