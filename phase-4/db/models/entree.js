"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Entree extends Model {
    static associate(models) {
     
      Entree.belongsTo(models.EntreeType, {
        as: "EntreeType",
        foreignKey: "entreeTypeId",
        onDelete: "CASCADE",
      });

      
      Entree.belongsToMany(models.Ingredient, {
        through: models.EntreeIngredient, 
        as: "ingredients",
        foreignKey: "entreeId",
        otherKey: "ingredientId",
      });

      Entree.hasMany(models.EntreeIngredient, { foreignKey: "entreeId" });
    }
  }

  Entree.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Name cannot be empty" },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Description cannot be empty" },
        },
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          isDecimal: { msg: "Price must be a decimal value" },
          min: {
            args: [0],
            msg: "Price must be non-negative",
          },
        },
      },
      entreeTypeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "EntreeTypes",
          key: "id",
        },
        validate: { isInt: true },
      },
    },
    {
      sequelize,
      modelName: "Entree",
      timestamps: true,
    }
  );

  return Entree;
};
