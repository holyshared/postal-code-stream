'use strict';

const fs = require('fs');
const iconv = require('iconv-lite');
const parser = require('../parser');
const unzip = require('unzip');
const Readable = require('stream').Readable;

class ZipStream extends Readable {
  constructor(file) {
    super({ objectMode: true });
    this.parser = parser();
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
      entry.pipe(iconv.decodeStream('shift_jis'))
        .pipe(iconv.encodeStream('utf8'))
        .pipe(this.parser);
      entry.autodrain();
    }
  }
}

module.exports = ZipStream;
