import { Sequelize } from "sequelize";
import databaseConfig from '../config/database';
import Cliente from '../models/Cliente' //todo model que criamos vai vir dentro desse arquivo aqui
import Produto from "../models/Produto";

//TODO MODULO QUE CRIARMOS VAMOS TER QUE TRAZER PARA CA, SENÃO SEU SISTEMA NÃO VAI FUNCIONAR
const models = [Cliente, Produto]; //vamos criar um array de Cliente que vai conter todos os nosso modulos, então se tivesse mais modulos importariamos os modulos aqui e colocariamos ele dentro desse array

const connection = new Sequelize(databaseConfig)//vai mandar as configurações da nossa base de dados aqui dentro
models.forEach(model => {
  model.init(connection) //estamos recebendo a conexão como parametro
})//vai percorrer esse array, porque se tiver mais modulos quando ele for colocando eles aqui vai fazer isso para todos automaticamente

models.forEach(model => {
  model.associate && model.associate(connection.models)//se tiver o modulo associate vai passar para a outra checagem e essa outra checagem vai pegar da conexão todos os modulos
})

//VAI CHECAR SEU O MODULO TEM O METODO STATIC ASSOCIATE, SEE TIVER VAI EXECUTAR ELE, SENÃO VAI DAR UNDEFINED

//PRECISAMOS CHAMAR ESSE ARQUIVO QUANDO STARTA O SERVIDOR, ENTÃO PRECISAMOS EXPORTAR ESSE ARQUIVO, NO APP O IMPORT VAI SER ASSIM: import './src/database';
