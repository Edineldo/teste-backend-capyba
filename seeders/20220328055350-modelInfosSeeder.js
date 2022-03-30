'use strict';

const generateBody = require('./scripts/ModelInfos');

module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('ModelInfos', generateBody());
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('ModelInfos', null, {});
  }
};
