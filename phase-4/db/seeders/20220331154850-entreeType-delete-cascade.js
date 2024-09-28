
'use strict';

const { Entree, EntreeType } = require('../models');

module.exports = {
  async up (queryInterface, Sequelize) {
    // Create an EntreeType entry
    const entreeType = await EntreeType.create({
      type: "Dairy",
      isVegetarian: false
    });

    // Create an Entree entry with the above EntreeType
    await Entree.create({
      name: "Milk Bread",
      description: "Bread made with milk",
      price: 2.28,
      entreeTypeId: entreeType.id
    });
  },

  async down (queryInterface, Sequelize) {
    // Clean up created entries
    await Entree.destroy({
      where: {
        name: "Milk Bread",
      }
    });

    await EntreeType.destroy({
      where: {
        type: "Dairy",
      }
    });
  }
};
