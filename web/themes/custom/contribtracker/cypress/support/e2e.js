import './commands';
import 'cypress-real-events'; // cypress inbuilt trigger() will only affect events in JavaScript and will not trigger any effects in CSS. See for more details: https://docs.cypress.io/api/commands/hover

import registerCypressGrep from '@cypress/grep';
registerCypressGrep();
