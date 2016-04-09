'use strict';

const fs = require('fs');
const csv = require('csv-parse');
const unzip = require('unzip');
const columns = require('./columns');
const Readable = require('stream').Readable;

function csvParser() {
  return csv({
    columns: columns,
    skip_empty_lines: true,
    trim: true
  });
}

class PostalCodeStream extends Readable {
  constructor(file) {
    super({ objectMode: true });
    this.parser = csvParser();
    this.parser.on('readable', () => this._readable());
    this.parser.on('end', () => this.push(null));
    this.stream = fs.createReadStream(file)
      .pipe(unzip.Parse())
      .on('entry', (entry) => this._entry(entry));
  }
  _read(size) {
  }
  _readable() {
    let r = null;
    while (r = this.parser.read()) {
      this.push(r);
    }
  }
  _entry(entry) {
    const fileName = entry.path;
    const type = entry.type; // 'Directory' or 'File'
    const size = entry.size;

    if (fileName === "this IS the file I'm looking for") {
      entry.pipe(fs.createWriteStream(__dirname));
    } else {
      entry.pipe(this.parser);
      entry.autodrain();
    }
  }
}
module.exports.PostalCodeStream = PostalCodeStream;

module.exports.createFromZipFile = function fromZipFile(file) {
  return new PostalCodeStream(file);
}
