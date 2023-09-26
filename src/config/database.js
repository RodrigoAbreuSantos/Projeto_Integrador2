require('dotenv').config()

module.exports = {
  dialect: 'mariadb',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  define: { //vamos criar um campo e ele vai usar esses campos para falar quando um registro foi criado na tabela e quando um registro foi atualizado naquela tabela, isso é interresante para ver qual foi a ultima data de criação daquele registro e qual foi a data de atualização
    timestamps: true,
    underscored: true,
    underscoredAll: true, //se vc tem 'nomeAluno' ele te entrega nome_aluno
    'createdAt': 'created_at', //vai falar quando o registro foi criado na tabela
    'updatedAt': 'updated_at' //vai falar quando o registro foi atualizado na tabela
  },
  dialectOptions: {
    timezone: 'America/Sao_Paulo'
  },
  timezone: 'America/Sao_Paulo'
}

