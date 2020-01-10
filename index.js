const cheerio = require('cheerio')
const config = require('config');
const request = require('request')

/**
 * Get a list of APIs from the main IAM reference page
 * @param {String} contents : String containing html content of IAM reference page
 *
 * @see https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_actions-resources-contextkeys.html
 * @returns {Array<String>}
 */
function getAPIs(contents) {
  const appConfig = config.get('scraping');
  const $ = cheerio.load(contents);
  const anchors = $(appConfig.api.selector);
  const list = anchors.map((_, element) => {
    return $(element).attr('href');
  });
  return list.get();
}
/**
 * Gets the html content of the IAM reference page and returns it as a string
 *
 * @returns {String}
 * @see https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_actions-resources-contextkeys.html
 */
function getReferencePolicies() {
  const appConfig = config.get('scraping');
  return request.get(appConfig.api.url);
}

/**
 * Application entrypoint
 */
async function main() {

  const iamReferencePolicies = await getReferencePolicies()
  const apis = getAPIs(iamReferencePolicies)

  return apis;
}

// exports for testing
module.exports = {
  getAPIs,
  getReferencePolicies,
  main,
}
