'use strict';
const generateBody = require('./scripts/Cars');
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('Cars', generateBody());

  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('Cars', null, {});
  }
};
