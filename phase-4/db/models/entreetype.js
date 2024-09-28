"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class EntreeType extends Model {
    static associate(models) {
      
      EntreeType.hasMany(models.Entree, {
        as: "Entrees",
        foreignKey: "entreeTypeId",
        onDelete: "CASCADE",
      });
    }
  }

  EntreeType.init(
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      isVegetarian: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "EntreeType",
    }
  );

  return EntreeType;
};
