var chai = require('chai'),
  factories = require('chai-factories'),
  expect = chai.expect,
  setup = require('./../_setup.js')._setup,
  request = require('request');

describe('integration', function() {

  before(function(done) {
    chai.use(factories);
    require('./../factories/gcmToken')(chai);

    setup.init(done);
  });

  describe('action', function() {
    it('api/registerGCMToken', function(done) {
      request.post(setup.testUrl + '/registerGCMToken', {
        form: chai.create('gcmToken')
      }, function(err, response, body) {
        body = JSON.parse(body);
        expect(body.error).to.be.undefined;
        done();
      });
    });
  });


});
