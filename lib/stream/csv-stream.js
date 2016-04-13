'use strict';

const fs = require('fs');
const iconv = require('iconv-lite');
const parser = require('../parser');
const Readable = require('stream').Readable;

class CSVStream extends Readable {
  constructor(file) {
    super({ objectMode: true });
    this.parser = parser();
    this.parser.on('readable', () => this._readable());
    this.parser.on('end', () => this.push(null));
    this.stream = fs.createReadStream(file)
      .pipe(iconv.decodeStream('shift_jis'))
      .pipe(iconv.encodeStream('utf8'))
      .pipe(this.parser);
  }
  _read(size) {
  }
  _readable() {
    let r = null;
    while (r = this.parser.read()) {
      this.push(r);
    }
  }
}

module.exports = CSVStream;
