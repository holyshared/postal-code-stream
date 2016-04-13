'use strict';

const csv = require('csv-parse');
const columns = require('./columns');

module.exports = function parser() {
  return csv({
    columns: columns,
    skip_empty_lines: true,
    trim: true
  });
}
