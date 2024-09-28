'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      make: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      model: {
        type: Sequelize.STRING(26),
        allowNull: false,
      },
      modelYear: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      bodyStyle: {
        type: Sequelize.STRING(16),
        allowNull: false,
      },
      trimLevel: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      milesPerGallon: {
        type: Sequelize.DECIMAL
      },
      powertrain: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'gas',
      },
      isAutomatic: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Cars');
  }
};