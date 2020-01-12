const scrape = require('./scrape');

/**
 * Application entrypoint
 */
async function main() {
  const iamReferencePolicies = await scrape.getReferencePolicies();
  const apis = scrape.getAPIs(iamReferencePolicies);

  return apis;
}

// exports for testing
module.exports = {
  main,
};

main().then(console.log);
