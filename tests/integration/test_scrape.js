require('chai').should();
const scrape = require('../../src/data/generate');

describe('Scrape', function Index() {
  describe('#getPages()', async function getPages() {
    it('should return multiple documents', async function shouldWork() {
      const index = Math.floor(Math.random() * this.fixtures.apiList.length - 10);
      const pages = this.fixtures.apiList.slice(index, index + 5); // get 5 random pages
      console.log(index, pages);
      const contents = await scrape.getPages(pages, 5, 'tests/data');
      // console.log(contents);
      // const url = new URL('search', 'https://google.com');
      // nock(url.origin)
      //   .get(url.pathname)
      //   .reply(200, 'foo bar');
      // const contents = await scrape.getPage(url);
      // contents.should.eql('foo bar');
    });
  });
});
