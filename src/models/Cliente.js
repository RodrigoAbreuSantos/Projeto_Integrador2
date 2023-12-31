//aqui estamos criando o model
//Vamos criar um modelo e fazer esse modulo conectar na base de dados

//MIGRATIONS ==> CRIAR TABELA NA BASE DADOS
//MODELS ==> REFERENTE AO DADOS DA TABELA

import Sequelize, { Model } from "sequelize";
//O model é referente a um dado, então estamos criando o model Cliente que é referente a tabela clientes

export default class Cliente extends Model { //esta fazendo a classe Aluno ser uma extensão da classe Model
  static init(sequelize) { //conexão do modulo, ele é a connection que estamos enviando para o index.js
    super.init({
      nome: Sequelize.STRING,
      cartao: Sequelize.INTEGER
    },
    {
      sequelize, //esta passando como parametro para o index.js dentro da pasta database a conexão com o banco de dados, e la no index vamos configurar a base de dados que estamos passando como parametro
    }); //esta chamando o init do pai que é a classe Model, estamos mandando 2 objetos um vai ter os campos o outro vai ter o sequelize que estamos recebendo no static
    return this //esta retornado tudo que esta dentro da classe Aluno
  }
}

//precisamos falar pro sequelize que esse modulo precisa da conexão dele

