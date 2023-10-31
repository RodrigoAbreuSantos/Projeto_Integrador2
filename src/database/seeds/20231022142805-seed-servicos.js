'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('servicos', [
      { id: 1, desc: 'cabelo' },
      { id: 2, desc: 'barba' },
      { id: 3, desc: 'sobrancelha' },
      { id: 4, desc: 'limpeza' },
      { id: 5, desc: 'nevou' },
      { id: 6, desc: 'depilacao' },
      { id: 7, desc: 'cabeloBarba'},
      { id: 8, desc: 'cabeloSobrancelha'},
      { id: 9, desc: 'barbaSobrancelha'}
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('servicos', null, {});
  },
};
