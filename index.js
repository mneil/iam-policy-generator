const cheerio = require('cheerio')
const config = require('config');
const request = require('request')

function getAPIs(contents) {
  const appConfig = config.get('scraping');
  const $ = cheerio.load(contents);
  const anchors = $(appConfig.api.selector);
  const list = anchors.map((_, element) => {
    return $(element).attr('href');
  });
  return list.get();
}

function getReferencePolicies() {
  const appConfig = config.get('scraping');
  return request.get(appConfig.api.url);
}

async function main() {
  const appConfig = config.get('scraping');

  const iamReferencePolicies = await getReferencePolicies()
  const apis = getAPIs(iamReferencePolicies)

  return apis;

  // const browser = await puppeteer.launch();
  // const page = await browser.newPage();
  // await page.goto(appConfig.api.url);

  // getAPIs(page, appConfig.api.selector)
  // await browser.close();
}


module.exports = {
  getAPIs,
  getReferencePolicies,
  main,
}
