"use strict";

const { Car } = require("../models");

const validCars = [
  {
    modelYear: 2020,
    make: "Toyota",
    model: "Corolla",
    bodyStyle: "SEDAN",
    trimLevel: "LE",
    color: "Blue",
    mileage: 15000,
    isAutomatic: true,
  },
  {
    modelYear: 2018,
    make: "Honda",
    model: "Civic",
    bodyStyle: "COUPE",
    trimLevel: "EX",
    color: "Red",
    mileage: 25000,
    isAutomatic: true,
  },
  {
    modelYear: 2022,
    make: "Ford",
    model: "Mustang",
    bodyStyle: "COUPE",
    trimLevel: "GT",
    color: "Black",
    mileage: 5000,
    isAutomatic: false,
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await Car.bulkCreate(validCars, { validate: true });
      console.log("Seeding success!");
    } catch (err) {
      console.error("Seed failed:", err);
      throw err;
    }
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Cars", null, {});
  },
  validCars, // Export the validCars array for testing or other uses
};
