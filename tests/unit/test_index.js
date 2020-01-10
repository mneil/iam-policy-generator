require('chai').should();
const index = require('../../index');

describe('Index', function Index() {

  describe('#getAPIs()', function getAPIs() {
    it('should return list of apis policy content', function shouldWork() {
      const policies = this.fixtures.referencePolicies(this);
      const apis = index.getAPIs(policies);
      apis.should.eql(this.fixtures.apiList);
    });
  });
});
