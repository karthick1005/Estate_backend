'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user_estates', [
      {
        id: 1,
        user_id: 1,
        estate_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_estates', null, {});
  }
};

