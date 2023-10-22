'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('servicos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      desc: {
        type: Sequelize.STRING,
        allowNull: true,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('servicos');
  },

  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('servicos', [
      { desc: 'cabelo' },
      { desc: 'barba' },
      { desc: 'sobrancelha' },
      { desc: 'limpeza' },
      { desc: 'nevou' },
      { desc: 'depilacao' },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('servicos', null, {});
  },
};



