require('chai').should();
const fixtures = require('./fixtures/index');
const logging = require('../src/logging');

// silence of the logs
logging.transports[0].silent = false;
/**
 * Run these things before all tests once
 */
before(async function globalBeforeAll() {
  await fixtures.removeDir('tests/data');
  await fixtures.makeDir('tests/data');
});
/**
 * Setup fixtures and attached to this.fixtures to be
 * available in each test
 */
beforeEach(async function globalBeforeEachFixtures() {
  this.fixtures = fixtures;
  await Promise.all([
    fixtures.removeDataDir,
  ]);
});
