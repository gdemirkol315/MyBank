'use strict';
const fs = require('fs');
function getJsonContent(filename) {
  return JSON.parse(fs.readFileSync('backend/common/vals/' + filename));
}

module.exports = {getJsonContent};
