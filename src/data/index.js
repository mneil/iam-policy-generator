const download = require('./download');

async function main() {
  await download.scrape();
}

main();
