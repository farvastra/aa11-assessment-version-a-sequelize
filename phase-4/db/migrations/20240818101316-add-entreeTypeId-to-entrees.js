"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add entreeTypeId column to the Entrees table
    await queryInterface.addColumn("Entrees", "entreeTypeId", {
      type: Sequelize.INTEGER,
      allowNull: true, // This can be true if you want to allow nulls, or false if it's required
      references: {
        model: "EntreeTypes", // References the EntreeTypes table
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL", // Set to null when the referenced EntreeType is deleted
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove entreeTypeId column from the Entrees table
    await queryInterface.removeColumn("Entrees", "entreeTypeId");
  },
};
