'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('brokers', [
      {
        id: 1,
        name: 'Broker One',
        email: 'broker1@example.com',
        phoneno: '1234567890',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Broker Two',
        email: 'broker2@example.com',
        phoneno: '0987654321',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'Broker Three',
        email: 'broker3@example.com',
        phoneno: '1122334455',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('brokers', null, {});
  }
};