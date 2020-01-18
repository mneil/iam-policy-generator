const fs = require('fs');
const path = require('path');
const util = require('util');
const apiList = require('./api-list.json');

function referencePolicies() {
  const fsP = util.promisify(fs.readFile);
  return fsP(
    path.join(__dirname, '..', 'fixtures', 'reference-policies.html'),
  );
}

function makeDir(dir) {
  const fsP = util.promisify(fs.mkdir);
  return fsP(
    dir, { recursive: true },
  );
}

function removeDir(dir) {
  const fsP = util.promisify(fs.rmdir);
  return fsP(
    dir, { recursive: true },
  );
}

module.exports = {
  referencePolicies,
  removeDir,
  makeDir,
  apiList,
};
