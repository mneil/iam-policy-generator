const fs = require('fs');
const path = require('path');
const apiList = require('./api-list.json');

function referencePolicies() {
  return fs.readFileSync(
    path.join(__dirname, '..', 'fixtures', 'reference-policies.html'),
  );
}

module.exports = {
  referencePolicies,
  apiList,
};
