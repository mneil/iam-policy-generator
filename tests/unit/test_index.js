require('chai').should();

const index = require('../../index');

describe('Index', function() {

  this.beforeEach(function() {
    this.fixtures.referencePolicies(this);
  })

  describe('#getAPIs()', function() {
    it('should return list of apis policy content', async function() {
      apis = index.getAPIs(this.policies);
      apis.should.eql(this.fixtures.apiList);
    });
  });

});
