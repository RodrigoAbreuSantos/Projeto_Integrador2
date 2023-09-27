import express from 'express';
import homeRoutes from './src/routes/homeRoutes.js'; //feito isso podemos falar pro app usar as rotas
import dotenv from 'dotenv';
import './src/database';
import userRoutes from './src/routes/userRoutes.js'; //feito isso podemos falar pro app usar as rotas
import cartaoRoutes from './src/routes/cartaoRoutes.js'
import produtosRoutes from './src/routes/produtosRoutes.js'

dotenv.config();

class App {
  constructor() { //sempre que instanciar a classe o contructor vai ser executado
    this.app = express(); //atributo app recebe o express
    this.middlewares(); //o metodo middleware vai ser chamado
    this.routes();

  }

  middlewares(){
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json()); //importante porque na grande maioria dos casos vamos trabalhar com json
  }

  routes(){
    this.app.use('/', homeRoutes);
    this.app.use('/gerarCard', cartaoRoutes);
    this.app.use('/produtos', produtosRoutes);
    this.app.use('/users', userRoutes);
  }
}

export default new App().app; //estamos exportando apenas o app, que na verdade é o express
