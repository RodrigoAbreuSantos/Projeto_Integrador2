'use strict';

//AQUI CRIAMOS NOSSA MIGRAÇÃO, migrations é alterações na base de dados, então vamos mexer diretamente na base de dados

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('produtos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      clienteId: {
        type: Sequelize.INTEGER, // Isso será a chave estrangeira
        allowNull: false,
        references: {
          model: 'clientes', // Nome da tabela de referência
          key: 'id', // Nome da coluna de referência
        },
        onDelete: 'CASCADE', //se vc deletar um cliente o produto tambem vai ser deletado
        onUpdate: 'CASCADE', //se vc atualizar o id do cliente por algum motivo, vai ser atualizado aqui tambem, para que não perca referencia
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

  },

  async down (queryInterface) {

    await queryInterface.dropTable('produtos');

  }
};


