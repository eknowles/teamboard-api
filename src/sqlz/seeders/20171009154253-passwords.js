'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('passwords', [
      {
        id: 'a72b32b0-ad04-11e7-922b-d933620e27f3',
        userId: '9e09ecf0-ad07-11e7-abc4-cec278b6b50a',
        hash: 'b390e57a34e9c01642403c144ad5e1ee1d3c1ddc4f3748b6a0cdb609f11085c5ee3e5078f5c0275c84e449aeecd1a9721ad42ffcaf421a444b9bf2333de4e9e8',
        salt: '6627aea2acb7ae3f88ad61e3a6f9fd15d11fccbbe3e99d1e7b53859b958778662bf21505b4af8fe2242c8cb3a511b8d8a1b32b77f875289e3668cce5de88e1b4',
        iterations: '10000',
        createdAt: new Date(),
      }
    ], {});
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('passwords', null, {});
  }
};
