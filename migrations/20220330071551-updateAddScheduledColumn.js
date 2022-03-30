'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Cars',
      'already_scheduled',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Cars', 'already_scheduled');

  }
};
