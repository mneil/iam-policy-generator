require('chai').should();
const nock = require('nock');
const scrape = require('../../src/data/generate');

describe('Scrape', function Index() {
  describe('#getAPIs()', function getAPIs() {
    it('should return list of apis policy content', async function shouldWork() {
      const policies = await this.fixtures.referencePolicies(this);
      const apis = scrape.getAPIs(policies);
      apis.should.eql(this.fixtures.apiList);
    });
  });
  describe('#getPage()', function getPage() {
    it('should request url', async function shouldWork() {
      const url = new URL('search', 'https://google.com');
      nock(url.origin)
        .get(url.pathname)
        .reply(200, 'foo bar');
      const contents = await scrape.getPage(url);
      contents.should.eql('foo bar');
    });
  });
  describe('#getPages()', function getPages() {
    it('should return multiple documents', async function shouldWork() {
      // const url = new URL('search', 'https://google.com');
      // nock(url.origin)
      //   .get(url.pathname)
      //   .reply(200, 'foo bar');
      // const contents = await scrape.getPage(url);
      // contents.should.eql('foo bar');
    });
  });
});
