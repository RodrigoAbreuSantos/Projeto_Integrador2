import Cliente from '../models/Cliente'

class ProdutosController {

  //METODO QUE LEVA PARA A ROTA PRODUTOS
  produtos(req, res){
    return res.render('produtos');
  }


  async verificaUsarioExiste(req, res, next){ //nesse rota queremos receber dados e checar se o usuario existe na base de dados
    const numeroDoCartaoNoReq = req.body.cartao;

    const user = await Cliente.findOne({ where: { cartao: numeroDoCartaoNoReq } })

    //nome e cartao que o usuario esta enviando, é o que vem do form

    //esta procurando se tem algum usuario com a chave cartao e o valor cartaoBody, ou seja o primeiro parametro é a chave e o segundo é o valor que esta sendo pego do req.body, e ele ta vendo se tem algum usuario no banco de dados com a chave cartao que tenha o mesmo valor que esta vindo do req.body

    if (!user){ //se não achar o user vai mostrar esse resposta
      console.log('Cartão Invalido')
      return res.redirect('back');
    }

    //se chegou ate aqui quer dizer que esta tudo certo

    const { id } = user; //esta pegando a chave id que esta no usuario

    console.log(`Ok, Id: ${id} Cartão: ${numeroDoCartaoNoReq} `)

    next();
  }

  //Tentando Mostrar Usuario Logado
  mostraUsuario = () => {
    return true
  };
}

export default new ProdutosController();

//vamos criar um dado na base de dados
