require('chai').should();
const config = require('config');
const fs = require('fs');
const util = require('util');
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
  describe('#getPartial()', function getPartial() {
    it('should turn .html to .partial.html', async function shouldWork() {
      const uri = './path.html';
      const partial = scrape.getPartial(uri);
      partial.should.eql('./path.partial.html');
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
      const appConfig = config.get('scraping');
      const url = new URL(appConfig.api.reference_path, appConfig.api.base_url);
      const scope = nock(url.origin)
        .persist()
        .get(/.*/)
        .reply(200, 'foo bar');
      const contents = await scrape.getPage(url);
      contents.should.eql('foo bar');
      const index = Math.floor(Math.random() * this.fixtures.apiList.length - 10);
      const pages = this.fixtures.apiList.slice(index, index + 5); // get 5 random pages
      await scrape.getPages(pages, 5, 'tests/data');
      await Promise.all(pages.map((page) => {
        const fsP = util.promisify(fs.exists);
        return fsP(`tests/data/${page}`);
      }));
      scope.persist(false);
    });
  });
});
