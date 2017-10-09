'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
      {
        id: '9e09ecf0-ad07-11e7-abc4-cec278b6b50a',
        email: 'user@domain.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
