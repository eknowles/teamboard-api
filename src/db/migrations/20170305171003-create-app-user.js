module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('users', {
      id: {type: Sequelize.UUID, defaultValue: Sequelize.UUIDV1, primaryKey: true},
      email: {allowNull: false, type: Sequelize.STRING(50), unique: true},
      createdAt: {type: Sequelize.DATE},
      updatedAt: {type: Sequelize.DATE}
    })
  ,
  down: (queryInterface, Sequelize) => queryInterface.dropTable('users')
};
