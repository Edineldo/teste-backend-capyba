'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Rent_schedules', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      car_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Cars',
          key: 'id',
        },
      },
      initial_price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      retrieve_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      devolution_date: {
        type: Sequelize.DATE,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Rent_schedules');
  }
};
