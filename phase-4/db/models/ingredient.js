"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {
    static associate(models) {
      
      Ingredient.belongsToMany(models.Entree, {
        through: "EntreeIngredient", 
        as: "Entrees",
        foreignKey: "ingredientId",
        otherKey: "entreeId",
      });
    }
  }

  Ingredient.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Name cannot be empty" },
        },
      },
      measurement: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Measurement cannot be empty" },
        },
        entreeId: {
          type: DataTypes.INTEGER,
          allowNull: true, 
        },
      },
    },
    {
      sequelize,
      modelName: "Ingredient",
      timestamps: false,
    }
  );

  return Ingredient;
};
