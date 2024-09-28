// migrations/xxxxxx-add-entreeId-to-ingredients.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Ingredients", "entreeId", {
      type: Sequelize.INTEGER,
      allowNull: true, 
      references: {
        model: "Entrees", 
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Ingredients", "entreeId");
  },
};
