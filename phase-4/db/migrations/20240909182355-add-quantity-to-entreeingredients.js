"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("EntreeIngredients", "quantity", {
      type: Sequelize.INTEGER,
      allowNull: false, // You can make it optional by setting allowNull: true
      defaultValue: 1, // Set a default value if needed
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("EntreeIngredients", "quantity");
  },
};
