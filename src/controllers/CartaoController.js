import Cliente from '../models/Cliente'

class CartaoController {

  //METODO QUE LEVA PARA A ROTA GERARCARD
  gerarCard(req, res){
    return res.render('gerarCard');
  }

  async teste(req, res){
    res.send(req.body);
    const user = await Cliente.create(req.body);//estamos criando os dados dos campos

    console.log(req.params.id)

    return user.id;

  }
}

export default new CartaoController();

//vamos criar um dado na base de dados
