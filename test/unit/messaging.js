var chai = require('chai'),
  should = chai.should(),
  factories = require('chai-factories'),
  should = require("should"),
  setup = require("./../_setup.js")._setup;

describe('unit', function() {
  before(function(done) {
    chai.use(factories);
    require('./../factories/gcmPayload')(chai);

    setup.init(done);
  });

  describe('messaging', function() {
    it('gcm.build', function() {
      setup.api.gcm.build().should.be.an('object');
    });

    it('gcm.generateMessageData', function() {
      setup.api.gcm.generateMessageData(chai.create('gcmPayload').message).should.be.an('object');
    });
  });
});
