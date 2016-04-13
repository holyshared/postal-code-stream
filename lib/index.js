'use strict';

const CSVStream = require('./stream/csv-stream');
const ZipStream = require('./stream/zip-stream');

module.exports.createFromZipFile = function fromZipFile(file) {
  return new ZipStream(file);
}

module.exports.createFromCSVFile = function createFromCSVFile(file) {
  return new CSVStream(file);
}
