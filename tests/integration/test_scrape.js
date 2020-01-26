require('chai').should();
const fs = require('fs');
const util = require('util');
const scrape = require('../../src/data/generate');

describe('Scrape', function Index() {
  describe('#getPages()', async function getPages() {
    it('should return multiple documents', async function shouldWork() {
      const index = Math.floor(Math.random() * this.fixtures.apiList.length - 10);
      const pages = this.fixtures.apiList.slice(index, index + 5); // get 5 random pages
      const partials = pages.map(scrape.getPartial);
      await scrape.getPages(partials, 5, 'tests/data');
      await Promise.all(pages.map((page) => {
        const fsP = util.promisify(fs.exists);
        return fsP(`tests/data/${page}`);
      }));
    });
  });
});
