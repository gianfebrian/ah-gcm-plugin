var faker = require('faker');

module.exports = function(chai) {
  chai.factory('gcmToken', {
    key: faker.random.number(100),
    registrationId: faker.random.uuid()
  });
}