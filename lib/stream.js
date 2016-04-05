'use strict';

const fs = require('fs');
const csv = require('csv-parse');
const unzip = require('unzip');
const columns = require('./columns');

function csvParser() {
  return csv({
    columns: columns,
    skip_empty_lines: true,
    trim: true,
    auto_parse: true
  });
}

module.exports.fromZipFile = function fromZipFile(file) {
  const parser = csvParser();

  fs.createReadStream(file)
    .pipe(unzip.Parse())
    .on('entry', (entry) => {
      const fileName = entry.path;
      const type = entry.type; // 'Directory' or 'File'
      const size = entry.size;

      if (fileName === "this IS the file I'm looking for") {
        entry.pipe(fs.createWriteStream(__dirname));
      } else {
        entry.pipe(parser);
        entry.autodrain();
      }
    });

  return parser;
}
