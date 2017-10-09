'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('passwords', {
      id: {type: Sequelize.UUID, defaultValue: Sequelize.UUIDV1, primaryKey: true},
      userId: {type: Sequelize.UUID, defaultValue: Sequelize.UUIDV1},
      hash: {allowNull: false, type: Sequelize.STRING(255)},
      salt: {allowNull: false, type: Sequelize.STRING(255)},
      iterations: {allowNull: false, type: Sequelize.INTEGER(6)},
      createdAt: {type: Sequelize.DATE},
    });
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('passwords');
  }
};
