exports.action = {
  name: 'registerGCMToken',
  description: 'Cache registrationId from GCM\'s register callback',
  blockedConnectionTypes: [],
  outputExample: {},
  matchExtensionMimeType: false,
  version: 1.0,
  toDocument: true,
  middleware: [],

  inputs: {
    key: {
      required: true
    },
    registrationId: {
      required: true
    }
  },

  run: function(api, data, next) {
    api.gcm.token.findOneOrRegister(params, next);
  }
};
