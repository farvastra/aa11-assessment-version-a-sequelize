"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Packages", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      trackingNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [10, 10],
          isNumeric: true,
          notEmpty: true,
        },
      },
      weightKg: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          min: 2,
          max: 80,
        },
      },

      sender: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      recipient: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [["Jane Doe", "john smith", "l33t c0de"]],
        },
      },
      isDelivered: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Packages");
  },
};
