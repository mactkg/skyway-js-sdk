'use strict';

const Util      = require('../src/util');
const assert    = require('power-assert');
const sinon     = require('sinon');

describe('Util', () => {
  let util;

  before(done => {
    util = new Util();
    util.debug = true;
    done();
  });

  describe('validateId', () => {
    it('should be valid when valid id is given', () => {
      const validIds = [
        'ABCD 0123',
        'ABCD_0123',
        'ABCD-0123-abcd-7890',
        'ABCD-0123------------abcd-7890'
      ];
      validIds.forEach(id => {
        assert(util.validateId(id));
      });
    });

    it('should be invalid when invalid id is given', () => {
      const validIds = [
        'あいうえお',
        '!@#$%^&&*()',
        'ABCD  0000 ',
        '><script>alert(1);</script>'
      ];
      validIds.forEach(id => {
        assert(util.validateId(id) === null);
      });
    });
  });

  describe('Log', () => {
    let stubLog;
    let stubErr;

    beforeEach(done => {
      stubLog = sinon.stub(console, 'log');
      stubErr = sinon.stub(console, 'error');
      done();
    });

    afterEach(done => {
      stubLog.restore();
      stubErr.restore();
      done();
    });

    it('should call error() once with both std and error message', done => {
      let err = new Error();
      err.message = 'Error message here';
      err.name = 'Error name here';

      util.log('normal message', err);
      assert(stubErr.callCount, 1);
      done();
    });

    it('should log() once with a normal message', done => {
      util.log('normal message');
      assert(stubLog.callCount, 1);
      done();
    });

    it('should log() once with empty argument', done => {
      util.log();
      assert(stubLog.callCount, 1);
      done();
    });
  });

  it('should return random token', done => {
    let token = util.randomToken();
    assert(token);
    // WIP
    done();
  });
});
