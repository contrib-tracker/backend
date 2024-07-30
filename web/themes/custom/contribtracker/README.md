# Contrib Tracker Automated Functional and Visual Regression Testing

This project aims to facilitate automated functional and visual regression checklists in the pipeline, reducing testing time and preventing production deployment issues.

## File Structure
* Config file - `cypress.config.js`
* Dependency file - `package.json`
* Test files - `(.cypress/e2e/)`
* Support files - `(.cypress/support)`
* Test data files - `(.cypress/fixtures)`

## Prerequisites
- npm and node js

## Usage

1. **Clone the repository:**

   `git clone https://github.com/contrib-tracker/backend.git`

2. **Install the required dependencies:**

   `cd web/themes/custom/contribtracker && npm i` (*_The test project is under contrib-tracker directory_*)

3. **Run the script:**

   The project is divided into separate modules for functional and visual testing. Each module can be used independently by running the following commands:

   - `npm run functional-prod` (*_To run functional tests on prod env_*)

   - `npm run vr-dev` (*_To run visual tests on dev env_*)

   For more details about custom scripts, please refer to the package.json file.

## Reporting

   TBD

Feel free to customize the script to suit your specific requirements :)