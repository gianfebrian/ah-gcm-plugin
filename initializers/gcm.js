var gcm = require('node-gcm'),
  _ = require('lodash');
  
module.exports = {
  loadPriority: 1000,
  startPriority: 1000,
  stopPriority: 1000,
  initialize: function(api, next) {
    var config = api.config.gcm;
    api.gcm = {};

    // gcm instantiate. hide config from the rest of our codes.
    api.gcm.build = function() {
      return new gcm.Sender(config.API_KEY);
    };

    // gcm payload generation.
    api.gcm.generateMessageData = function(message) {
      var gcmMessage = new gcmMessage();
      gcmMessage.addData(message)
      return gcmMessage;
    };

    // message and target registrationTokens are required for this method.
    api.gcm.send = function(options, callback) {
      options = options || {};
      if (_.isEmpty(options.message))
        return callback('message is empty');
      if (_.isEmpty(options.registrationId))
        return callback('registrationTokens is empty');

      gcm.build().send(gcm.generateMessageData(message), {
        registrationTokens: options.registrationTokens
      }, callback);
    };

    // use options.taskName to queue your gcm send in your own custom queue.
    api.gcm.sendInQueue = function(options, callback) {
      options = options || {};
      if (_.isEmpty(options.message))
        return callback('message is empty');
      if (_isEmpty(options.tokenKeys))
        return callback('tokenKeys is empty');

      api.tasks.enqueue(options.taskName || 'defaultGCMQueue', {
        message: options.message,
        tokenKeys: options.tokenKeys
      }, callback);
    };

    next();
  }
};
