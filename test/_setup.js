process.env.NODE_ENV = 'test';
process.env.PROJECT_ROOT = process.cwd() + "/../..";

exports._setup = {
  serverPrototype: require("actionhero").actionheroPrototype,
  testUrl: "http://127.0.0.1:8081/api",

  init: function(callback) {
    var self = this;
    if (!self.server) {
      self.server = new self.serverPrototype();
      self.server.start(function(err, api) {
        self.api = api;
        callback();
      });
    } else {
      self.server.restart(function() {
        callback();
      });
    }
  }

};
