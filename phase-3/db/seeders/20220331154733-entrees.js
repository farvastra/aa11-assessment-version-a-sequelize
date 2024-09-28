'use strict';

const { Entree, EntreeType } = require('../models');

const entrees = [
  {
    name: "John's Impossible Burger",
    description: "Plant-based yumminess on a bun with brown-ale mustard",
    price: 10.34,
  },
  {
    name: "Caesar Salad",
    description: "Lettuce salad with caesar dressing and tomatoes",
    price: 7.89,
  },
  {
    name: "Chicken Noodle Soup",
    description: "Warm and hearthy soup with chicken and egg noodles",
    price: 8.99,
  },
  {
    name: "Beef Skewers",
    description: "Delicious tiny cuts of beef on a stick",
    price: 8.99,
  },
  {
    name: "Steak Frites",
    description: "Tender steak with french fries on the side",
    price: 21.50,
  },
  {
    name: "Egg Salad",
    description: "Mayonnaise with egg",
    price: 18.49,
  },
  {
    name: "Milk Bread",
    description: "Bread made with milk",
    price: 2.28,
  },
];

module.exports = {
  async up (queryInterface, Sequelize) {
    for (let entreeInfo of entrees) {
      const { name, description, price } = entreeInfo;
      await Entree.create({
        name,
        description,
        price,
      });
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Entrees', {
      name: entrees.map(entree => entree.name)
    }, {});
  }
};
