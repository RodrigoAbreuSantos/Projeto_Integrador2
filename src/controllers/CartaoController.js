import Cliente from '../models/Cliente'

class CartaoController {

  //METODO QUE LEVA PARA A ROTA GERARCARD
  gerarCard(req, res){
    return res.render('gerarCard');
  }

}

export default new CartaoController();

//vamos criar um dado na base de dados
