const async = require('async');
const cheerio = require('cheerio');
const config = require('config');
const request = require('request-promise-native');
const logging = require('./logging');

const logger = logging.child({ label: 'scrape' });
/**
 * getPage returns the contents of a page when given a url
 * @param {URL} url
 */
function getPage(url) {
  const strUrl = url.toString();
  logging.info('getPage(%s)', strUrl);
  return request(strUrl);
}
/**
 * Get pages returns the contents of mutiple html documents
 * given a list of urls and a concurrency
 */
async function getPages(pages, concurrency = 10) {
  logging.info('getPages(len(pages):%d, %d)', pages.length, concurrency);
  return new Promise((resolve, reject) => {
    const q = async.queue((task, next) => {
      logging.debug('processing: %s', task);
      const appConfig = config.get('scraping');
      const url = new URL(appConfig.api.reference_path, appConfig.api.base_url);
      getPage(url).then(next);
    }, concurrency);
    // assign a callback
    q.drain(resolve);
    // The entire thing fails
    q.error((err, task) => {
      logging.error('getPages() task error', err, task);
      reject();
    });
    // add all requests to the queue
    q.push(pages);
  });
}
/**
 * Get a list of APIs from the main IAM reference page
 * @param {String} contents : String containing html content of IAM reference page
 *
 * @see https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_actions-resources-contextkeys.html
 * @returns {Array<String>}
 */
function getAPIs(contents) {
  logger.info('getAPIs()');
  const appConfig = config.get('scraping');
  const $ = cheerio.load(contents);
  const anchors = $(appConfig.api.selector);
  const list = anchors.map((_, element) => $(element).attr('href'));
  return list.get();
}
/**
 * Gets the html content of the IAM reference page and returns it as a string
 *
 * @returns {String}
 * @see https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_actions-resources-contextkeys.html
 */
function getReferencePolicies() {
  logging.info('getReferencePolicies()');
  const appConfig = config.get('scraping');
  const url = new URL(appConfig.api.reference_path, appConfig.api.base_url);
  return getPage(url);
}
// exports for testing
module.exports = {
  getAPIs,
  getReferencePolicies,
  getPages,
};
