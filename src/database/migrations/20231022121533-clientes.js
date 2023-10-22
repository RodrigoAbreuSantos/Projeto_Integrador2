'use strict';

//AQUI CRIAMOS NOSSA MIGRAÇÃO, migrations é alterações na base de dados, então vamos mexer diretamente na base de dados

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('clientes', {
      cartao: {// Defina o campo 'cartao' como chave primária
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      created_at: { //não precisamos enviar os dados desse campo porque o sequelize faz isso automaticamente, mas precisamos na migração criar esses campos
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('clientes');
  },
};
