var async = require('async');

exports.task = {
  name: 'defaultGCMQueue',
  description: 'GCM response sometimes takes too long (several miliseconds). \
    Your action shouldn\'t wait for it. \
    It\'s a default task to queue gcm send. \
    Your payload will be sent to target recipient id(s) immadiately one after another',
  frequency: 0,
  queue: 'default',
  plugins: [],
  pluginOptions: {},

  run: function(api, params, next) {
    var message = params.message,
      tokenKeys = params.tokenKeys;

    async.waterfall([
      function(callback) {
        api.gcm.token.find(tokenKeys, callback);
      },
      function(registrationTokens, callback) {
        api.gcm.send({
          message: message,
          registrationTokens: registrationTokens
        }, callback);
      }
    ], function(err, result) {
      // your failover handler implementation
      next(err, result);
    });
  }
};
