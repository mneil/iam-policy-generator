require('chai').should();
const fixtures = require('./fixtures/index');
const logging = require('../src/logging');

// silence of the logs
logging.transports[0].silent = true;
/**
 * Setup fixtures and attached to this.fixtures to be
 * available in each test
 */
beforeEach(function globalBeforeEachFixtures() {
  this.fixtures = fixtures;
});
