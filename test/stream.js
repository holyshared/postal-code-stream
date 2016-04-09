const stream = require('../lib/stream');

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
});
