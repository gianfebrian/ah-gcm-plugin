var chai = require('chai'),
  expect = chai.expect,
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
      expect(setup.api.gcm.build()).to.be.an('object');
    });

    it('gcm.generateMessageData', function() {
      expect(setup.api.gcm.generateMessageData(chai.create('gcmPayload').message)).to.be.an('object');
    });
  });
});
