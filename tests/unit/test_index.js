require('chai').should();
const index = require('../../index');

describe('Index', function Index() {
  this.beforeEach(function beforeEach() {
    this.fixtures.referencePolicies(this);
  });
  describe('#getAPIs()', function getAPIs() {
    it('should return list of apis policy content', function shouldWork() {
      const apis = index.getAPIs(this.policies);
      apis.should.eql(this.fixtures.apiList);
    });
  });
});
