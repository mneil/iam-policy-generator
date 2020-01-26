const async = require('async');
const cheerio = require('cheerio');
const config = require('config');
const fs = require('fs');
const path = require('path');
const request = require('request-promise-native');
const logging = require('../logging');

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
 * Write a file to disk at path
 * @param {String} filePath
 * @param {String} contents
 */
function writeToDisk(filePath, contents) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, contents, { encoding: 'utf8' }, (err) => {
      if (err) return reject(err);
      return resolve();
    });
  });
}
/**
 * Get pages returns the contents of mutiple html documents
 * given a list of urls and a concurrency
 */
async function getPages(pages, concurrency = 10, targetDir = 'data') {
  logging.info('getPages(len(pages):%d, %d)', pages.length, concurrency);
  return new Promise((resolve, reject) => {
    const q = async.queue((task, next) => {
      logging.debug('processing: %s', task);
      const appConfig = config.get('scraping');
      const url = new URL(task, appConfig.api.base_url);
      logging.debug('url: %s', url.toString());
      getPage(url).then((page) => {
        writeToDisk(path.join(targetDir, task), page).then(next);
      });
    }, concurrency);
    // assign a callback
    q.drain(resolve);
    // The entire thing fails
    q.error((err) => {
      logging.error('getPages() task error: %s', err);
      reject();
    });
    // add all requests to the queue
    q.push(pages);
  });
}
/**
 * Takes a string ending with .html and prepends .partial
 * for AWS url reference
 * @param {String} uri
 */
function getPartial(uri) {
  const parts = uri.split('.');
  parts.splice(parts.length - 1, 0, 'partial');
  return parts.join('.');
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
/**
 * Application entrypoint
 */
async function scrape() {
  const iamReferencePolicies = await getReferencePolicies();
  await writeToDisk('data/reference.html', iamReferencePolicies);
  const apis = getAPIs(iamReferencePolicies);
  const partials = apis.map(getPartial);
  await getPages(partials, 10, 'data');

  return apis;
}

// exports for testing
module.exports = {
  getAPIs,
  getReferencePolicies,
  getPages,
  getPage,
  getPartial,
  scrape,
};

// main().then(console.log);
