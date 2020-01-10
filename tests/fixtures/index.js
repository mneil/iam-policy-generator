const fs = require('fs');
const path = require('path');
const apiList = require('./api-list.json');

function referencePolicies(fixture) {
  fixture.policies = fs.readFileSync( // eslint-disable-line no-param-reassign
    path.join(__dirname, '..', 'fixtures', 'reference-policies.html'),
  );
}

module.exports = {
  referencePolicies,
  apiList,
};
