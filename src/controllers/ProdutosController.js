import Cliente from '../models/Cliente'
import Produto from '../models/Produto'

class ProdutosController {

  //METODO QUE LEVA PARA A ROTA PRODUTOS
  produtos(req, res){
    return res.render('produtos', { user: req.user || {} });
  }


  async verificaUsarioExiste(req, res, next){ //nesse rota queremos receber dados e checar se o usuario existe na base de dados
    try{
      const numeroDoCartaoNoReq = req.body.cartao;

      const user = await Cliente.findOne({ where: { cartao: numeroDoCartaoNoReq } })

      //nome e cartao que o usuario esta enviando, é o que vem do form

      //esta procurando se tem algum usuario com a chave cartao e o valor cartaoBody, ou seja o primeiro parametro é a chave e o segundo é o valor que esta sendo pego do req.body, e ele ta vendo se tem algum usuario no banco de dados com a chave cartao que tenha o mesmo valor que esta vindo do req.body

      if (!user){ //se não achar o user vai mostrar esse resposta
        console.log('Cartão Invalido')
        return res.render('produtos', { error: 'Cartão Inválido, tente novamente' });
        //res.redirect('back')
      }

      //se chegou ate aqui quer dizer que esta tudo certo


      // Defina o número do cartão como uma variável de contexto


      // Após a validação do usuário

      req.session.userCartao = user.cartao; // Supondo que 'id' seja o ID do usuário

      next()

      return res.render('produtos', { hit: 'Usuario Logado com Sucesso' });


    }catch(erro){
      return res.render('produtos', { error: 'Erro ao verificar usuário' });
    }

  }

  async fazerCompra(req, res, next) {
    try {
      if (req.session.userCartao) {
         // Obtenha os produtos selecionados do corpo da requisição
        const cartao = req.session.userCartao
        // Exibe os produtos selecionados e o ID do usuário no console (apenas para fins de depuração)

        console.log('Req Body: ', req.body, 'Req Produtos:', req.session.Produto, 'Req Id:', req.session.userCartao)

        /*const user = await Produto.create({
          "produtos": ["barba", "sobrancelha", "limpeza"],
          "cliente_id": 1
        })
        */

        // Renderize uma página ou mensagem de confirmação com os produtos selecionados



        return res.render('produtos', req.session.Produto, cartao);
      } else {
        throw new Error('Número do cartão não encontrado na sessão.');
      }
    } catch (erro) {
      console.error('Erro em processarCompra:', erro);
      return res.render('produtos', { error: erro.message });
    }

  }

  async processarCompra(req, res){
    const cartao = req.session.userCartao

    if (req.body.cabelo) {
      const db = {
        "cliente_cartao": cartao,
        "cod_servico": 1
      }
      const user = await Produto.create(db);
      console.log(db)
      console.log(user)
    }
    if (req.body.barba){
      const db = {
        "cliente_cartao": cartao,
        "cod_servico": 2
      }
      const user = await Produto.create(db);
      console.log(db)
    }
    if (req.body.sobrancelha){
      const db = {
        "cliente_cartao": cartao,
        "cod_servico": 3
      }
      const user = await Produto.create(db);
      console.log(db)
    }
    if (req.body.limpeza){
      const db = {
        "cliente_cartao": cartao,
        "cod_servico": 4
      }
      const user = await Produto.create(db);
      console.log(db)
    }
    if (req.body.nevou){
      const db = {
        "cliente_cartao": cartao,
        "cod_servico": 5
      }
      const user = await Produto.create(db);
      console.log(db)
    }
    if (req.body.depilacao){
      const db = {
        "cliente_cartao": cartao,
        "cod_servico": 6
      }
      const user = await Produto.create(db);
      console.log(db)
    }
    if (req.body.cabeloBarba){
      const db = {
        "cliente_cartao": cartao,
        "cod_servico": 7
      }
      const user = await Produto.create(db);
      console.log(db)
    }
    if (req.body.cabeloSobrancelha){
      const db = {
        "cliente_cartao": cartao,
        "cod_servico": 8
      }
      const user = await Produto.create(db);
      console.log(db)
    }
    if (req.body.barbaSobrancelha){
      const db = {
        "cliente_cartao": cartao,
        "cod_servico": 9
      }
      const user = await Produto.create(db);
      console.log(db)
    }



    return res.render('index');
  }

}



export default new ProdutosController();

//vamos criar um dado na base de dados
