'use strict';
/** @type {import('sequelize-cli').Migration} */
const fs = require('fs').promises;
module.exports = {
  async up(queryInterface, Sequelize) {
    await fs.readFile('up.sql', 'utf-8').then(sql => { queryInterface.sequelize.query(sql) })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('DROP SCHEMA public CASCADE;');

    // Create the public schema again
    await queryInterface.sequelize.query('CREATE SCHEMA public;');
  }
};
