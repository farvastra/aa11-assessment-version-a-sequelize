'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Car.init({
    make: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 30],
        hasCapitalizedWords(value) {
          const words = value.split(' ');
          for (let word of words) {
            const chars = word.split('');
            chars[0] = chars[0].toUpperCase();
            const capitalizedWord = chars.join('');
            if (capitalizedWord !== word) {
              throw new Error('Make must be capitalized word(s) only');
            }
          }
        }
      }
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 26],
      }
    },
    modelYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1998,
        max: 2024
      }
    },
    bodyStyle: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,16],
        isUppercase: true,
      }
    },
    trimLevel: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,20],
      }
    },
    milesPerGallon: {
      type: DataTypes.DECIMAL,
      validate: {
        min: 5,
        max: 100,
        isNotElectric(value) {
          if (value && this.powertrain === 'electric') {
            throw new Error('Electric cars cannot have miles per gallon specs');
          }
        }
      }
    },
    powertrain: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'gas',
      validate: {
        isGasElectricOrHybrid(value) {
          const validValues = new Set(['gas', 'electric', 'hybrid']);
          if (!validValues.has(value)) {
            throw new Error('Powertrain must be gas, electric, or hybrid');
          }
        }
      }
    },
    isAutomatic: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      validate: {
        isNotElectricWhenManual(value) {
          if (value === false && this.powertrain === 'electric') {
            throw new Error('Car cannot be electric and manual at the same time');
          }
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Car',
    indexes: [
      {
        unique: true,
        fields: ['make', 'model', 'modelYear', 'bodyStyle', 'trimLevel'],
      }
    ]
  });
  return Car;
};