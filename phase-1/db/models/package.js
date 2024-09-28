"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Package extends Model {
    static associate(models) {
      // Define associations here
    }
  }

  Package.init(
    {
      trackingNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [10, 10],
          isNumeric: true,
          customValidator(value) {
            if (!/^\d{10}$/.test(value)) {
              throw new Error(
                "Tracking number must be exactly 10 digits long."
              );
            }
          },
        },
      },
      weightKg: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 2,
          max: 80,
        },
      },
      sender: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      recipient: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [["Jane Doe", "john smith", "l33t c0de"]],
        },
      },
      isDelivered: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Package",
    }
  );

  return Package;
};
