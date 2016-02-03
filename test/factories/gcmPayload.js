var faker = require('faker');

module.exports = function(chai) {
  chai.factory('gcmPayload', {
    message: faker.lorem.paragraph(1),
    registrationTokens: [faker.random.uuid()]
  });
}