var _ = require('lodash'),
  async = require('async');

module.exports = {
  loadPriority: 1010,
  startPriority: 1010,
  stopPriority: 1010,
  initialize: function(api, next) {
    var config = api.config.gcm;

    api.gcm.token = {};

    // build cache key. cache prefix can be configured in gcm config.
    var buildCacheKey = function(key) {
      return [config.cachePrefix, key].join('_');
    };

    var validateEmptyOptions = function(mustExistKeys, options) {
      var options = options || {},
        err = '';
      _.each(mustExistKeys, function(n) {
        if (err) return;
        if (_.isEmpty(options[n])) err = n + ' is empty';
      });

      return err || null;
    };

    api.gcm.token.register = function(options, callback) {
      var isEmpty = validateEmptyOptions(['registrationId', 'key'], options);
      if (isEmpty) return isEmpty;

      api.cache.save(buildCacheKey(options.key), options.registrationId, null, callback)
    };

    api.gcm.token.findOne = function(key, callback) {
      if (_.isArray(key))
        return callback('only accept non-array key');

      api.cache.load(buildCacheKey(key), callback);
    };

    api.gcm.token.findCollection = function(keys, callback) {
      if (!_.isArray(keys))
        return api.gcm.token.findOne(keys, callback);

      async.map(keys, api.gcm.token.findOne.bind(api.gcm.findOne), callback);
    };

    api.gcm.token.find = function(keys, callback) {
      if (!_.isArray(keys))
        return api.gcm.token.findOne(keys, callback);
      
      api.gcm.token.findCollection(keys, callback);
    };

    api.gcm.token.findOneOrRegister = function(options, callback) {
      var isEmpty = validateEmptyOptions(['registrationId', 'key'], options);
      if (isEmpty) return isEmpty;

      api.gcm.token.findOne(options.key, function(err, result) {
        if (result)
          return callback(null, result);

        api.gcm.token.register(options, callback);
      });
    };

    next();
  }
}
