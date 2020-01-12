require('chai').should();
const scrape = require('../../src/scrape');

describe('Scrape', function Index() {
  describe('#getAPIs()', function getAPIs() {
    it('should return list of apis policy content', function shouldWork() {
      const policies = this.fixtures.referencePolicies(this);
      const apis = scrape.getAPIs(policies);
      apis.should.eql(this.fixtures.apiList);
    });
  });
});
