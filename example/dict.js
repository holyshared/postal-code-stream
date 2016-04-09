'use strict';

const fs = require('fs'); 
const stream = require('../lib/stream'); 

const reader = stream.createFromZipFile('../ken_all.zip');
const dict = new Map();

reader.on('data', (r) => {
  const prefix = r.zip_code.toString().slice(0, 3);
  const prefixDict = dict.get(prefix) || new Map();

  prefixDict.set(r.zip_code, r);

  dict.set(prefix, prefixDict);
});

reader.on('end', () => {
  let value = null;
  const iter = dict.entries();

  while(value = iter.next()) {
    if (value.done) {
      break;
    }
    const i = value.value;
    const k = i.shift();
    const v = i.shift();

    const obj = {};
    v.forEach((v1, k1) => obj[k1] = v1);

    fs.writeFile(k + '.json', JSON.stringify(obj), (err) => {});
  }
});
