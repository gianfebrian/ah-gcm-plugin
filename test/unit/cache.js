var chai = require('chai'),
  factories = require('chai-factories'),
  expect = chai.expect,
  async = require('async'),
  setup = require('./../_setup.js')._setup,
  gcmTokenA, gcmTokenB, gcmTokenC;

describe('unit', function() {
  before(function(done) {
    chai.use(factories);

    require('./../factories/gcmToken')(chai);
    gcmTokenA = chai.create('gcmToken');
    gcmTokenB = chai.create('gcmToken');
    gcmTokenC = chai.create('gcmToken');

    setup.init(done);
  });

  describe('token cache', function() {
    it('gcm.token.register', function(done) {
      setup.api.gcm.token.register(gcmTokenA, function(err, result) {
        expect(result).to.be.ok;
        done();
      });
    });

    it('gcm.token.findOne', function(done) {
      setup.api.gcm.token.findOne(gcmTokenA.key, function(err, result) {
        expect(result).to.eql(gcmTokenA.registrationId);
        done();
      });
    });

    it('gcm.token.findCollection', function(done) {
      async.waterfall([
        function(callback) {
          async.map([gcmTokenB, gcmTokenC], setup.api.gcm.token.register.bind(setup.api.gcm.token.register), callback);
        },
        function(collection, callback) {
          setup.api.gcm.token.findCollection([gcmTokenA.key, gcmTokenB.key, gcmTokenC.key], callback);
        }
      ], function(err, result) {
        expect(result).to.eql([gcmTokenA.registrationId, gcmTokenB.registrationId, gcmTokenC.registrationId]);
        done();
      });
    });

    it('gcm.token.find (with single key)', function(done) {
      setup.api.gcm.token.find(gcmTokenA.key, function(err, result) {
        expect(result).to.eql(gcmTokenA.registrationId);
        done();
      });
    });

    it('gcm.token.find (with severla keys)', function(done) {
      setup.api.gcm.token.find([gcmTokenA.key, gcmTokenB.key], function(err, result) {
        expect(result).to.eql([gcmTokenA.registrationId, gcmTokenB.registrationId]);
        done();
      });
    });

  });
});
