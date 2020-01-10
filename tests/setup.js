require('chai').should();
const fixtures = require('./fixtures/index');

/**
 * Setup fixtures and attached to this.fixtures to be
 * available in each test
 */
beforeEach(function globalBeforeEachFixtures() {
  this.fixtures = fixtures;
});
