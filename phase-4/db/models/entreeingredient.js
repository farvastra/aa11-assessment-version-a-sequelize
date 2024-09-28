"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class EntreeIngredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     
      EntreeIngredient.belongsTo(models.Entree, { foreignKey: "entreeId" });
      EntreeIngredient.belongsTo(models.Ingredient, {
        foreignKey: "ingredientId",
      });
    }
  }

  EntreeIngredient.init(
    {
      entreeId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Entrees",
          key: "id",
        },
      },
      ingredientId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Ingredients",
          key: "id",
        },
      },
      quantity: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "EntreeIngredient",
      timestamps: false,
    }
  );

  return EntreeIngredient;
};
