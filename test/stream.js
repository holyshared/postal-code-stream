const stream = require('../lib/index');

describe('stream', () => {
  describe('#createFromZipFile', () => {
    beforeEach(function(done) {
      this.results = [];
      this.stream = stream.createFromZipFile('test/fixtures/dump.csv.zip');
      this.stream.on('data', (r) => this.results.push(r));
      this.stream.on('end', done);
    });
    it('should be read from zip file', function() {
      assert.ok(this.results.length === 100);
    });
  });
  describe('#createFromCSVFile', () => {
    beforeEach(function(done) {
      this.results = [];
      this.stream = stream.createFromCSVFile('test/fixtures/dump.csv');
      this.stream.on('data', (r) => this.results.push(r));
      this.stream.on('end', done);
    });
    it('should be read from csv file', function() {
      assert.ok(this.results.length === 100);
    });
  });
});
