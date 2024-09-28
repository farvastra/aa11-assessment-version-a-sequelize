const { Op } = require("sequelize");

("use strict");

const validPackages = [
  {
    trackingNumber: "9876543210",
    weightKg: 2,
    sender: null,
    recipient: "Jane Doe",
    isDelivered: true,
  },
  {
    trackingNumber: "0000000001",
    weightKg: 46,
    sender: "Anonymous",
    recipient: "john smith",
    isDelivered: true,
  },
  {
    trackingNumber: "1000000001",
    weightKg: 80,
    sender: "Jane Doe",
    recipient: "Jane Doe",
    isDelivered: false,
  },
  {
    trackingNumber: "2000000001",
    weightKg: 80,
    sender: "l33t",
    recipient: "john smith",
    isDelivered: false,
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkInsert("Packages", validPackages, {});
    } catch (error) {
      console.error("Seeding error:", error);
    }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "Packages",
      null,
      {
        trackingNumber: {
          [Op.in]: validPackages.map((package) => package.trackingNumber),
        },
      },
      {}
    );
  },
};
