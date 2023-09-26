'use strict';

//AQUI CRIAMOS NOSSA MIGRAÇÃO, migrations é alterações na base de dados, então vamos mexer diretamente na base de dados

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('clientes', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cartao: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: { //não precisamos enviar os dados desse campo porque o sequelize faz isso automaticamente, mas precisamos na migração criar esses campos
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });

  },

  async down (queryInterface) {

    await queryInterface.dropTable('clientes');

  }
};
