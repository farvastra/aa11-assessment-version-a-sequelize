'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addIndex(
      'Cars',
      ['make', 'model', 'modelYear', 'bodyStyle', 'trimLevel'],
      {
        unique: true
      }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeIndex(
      'Cars',
      ['make', 'model', 'modelYear', 'bodyStyle', 'trimLevel']
    );
  }
};
