import express from 'express';
import homeRoutes from './src/routes/homeRoutes.js'; //feito isso podemos falar pro app usar as rotas
import dotenv from 'dotenv';
import './src/database';
import userRoutes from './src/routes/userRoutes.js'; //feito isso podemos falar pro app usar as rotas
import cartaoRoutes from './src/routes/cartaoRoutes.js' 
import produtosRoutes from './src/routes/produtosRoutes.js'
import relatorioRoutes from './src/routes/relatorioRoutes.js'
const session = require('express-session')

dotenv.config();

class App {
  constructor() { //sempre que instanciar a classe o contructor vai ser executado
    this.app = express(); //atributo app recebe o express
    this.salvarSessao();
    this.middlewares(); //o metodo middleware vai ser chamado
    this.routes();
  }
  salvarSessao(){
    this.app.use(session({
      secret: 'seu_segredo', // Deve ser um segredo seguro e não deve ser compartilhado publicamente
      resave: false,          // Evita que a sessão seja salva a cada solicitação
      saveUninitialized: true // Salva uma sessão mesmo se ela ainda não foi inicializada
    }));
  }



  middlewares(){
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json()); //importante porque na grande maioria dos casos vamos trabalhar com json
  }

  routes(){
    this.app.use('/', homeRoutes);
    this.app.use('/gerarCard', cartaoRoutes);
    this.app.use('/produtos', produtosRoutes);
    this.app.use('/relatorio', relatorioRoutes);
    this.app.use('/users', userRoutes);
  }
}

export default new App().app; //estamos exportando apenas o app, que na verdade é o express
