"use strict";

const { Entree, EntreeType } = require("../models");

const entrees = [
  {
    name: "John's Impossible Burger",
    description: "Plant-based yumminess on a bun with brown-ale mustard",
    price: 10.34,
    entreeType: "Plant-based",
  },
  {
    name: "Caesar Salad",
    description: "Lettuce salad with caesar dressing and tomatoes",
    price: 7.89,
    entreeType: "Plant-based",
  },
  {
    name: "Chicken Noodle Soup",
    description: "Warm and hearthy soup with chicken and egg noodles",
    price: 8.99,
    entreeType: "Chicken",
  },
  {
    name: "Steak Frites",
    description: "Tender steak with french fries on the side",
    price: 21.5,
    entreeType: "Beef",
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    for (let entreeInfo of entrees) {
      const { name, description, price, entreeType } = entreeInfo;

      try {
        const foundEntreeType = await EntreeType.findOne({
          where: { type: entreeType },
        });

        if (!foundEntreeType) {
          console.error(`EntreeType ${entreeType} not found.`);
          continue; // Skip this entry if the type is not found
        }

        await Entree.create({
          name,
          description,
          price,
          entreeTypeId: foundEntreeType.id,
        });
      } catch (error) {
        console.error(`Error creating entree: ${error.message}`);
      }
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "Entrees",
      {
        name: entrees.map((entree) => entree.name),
      },
      {}
    );
  },
};
