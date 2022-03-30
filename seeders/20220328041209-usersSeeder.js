'use strict';

const generateBody = require('./scripts/Users');

module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('Users', generateBody());
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('Users', null, {});
  }
};
