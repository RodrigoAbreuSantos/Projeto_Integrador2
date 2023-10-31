import Cliente from '../models/Cliente'

class HomeController {

  index(req, res, next){ //aqui que vai ficar a requisição e a resposta
    res.render('index');
  }



  //METODO QUE POR ENQUANTO ESTA CRIANDO UM USUARIO NO BANCO DE DADOS PEGANDO OS DADOS DO FORM GERARCARD E LEVANDO PARA A ROTA HOME

/*
  async teste(req, res){
    res.send(req.body);
    const user = await Cliente.create({
      nome: 'Luiz',
      cartao: 1234
    });

    console.log(user)
    res.json(user)
  }
  */

}

export default new HomeController();

//vamos criar um dado na base de dados
