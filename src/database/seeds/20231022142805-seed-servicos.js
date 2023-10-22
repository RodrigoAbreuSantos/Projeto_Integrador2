'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
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
