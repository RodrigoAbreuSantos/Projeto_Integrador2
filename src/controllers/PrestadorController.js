import Cliente from '../models/Cliente'
import Produto from '../models/Produto'

class PrestadorController {

  //METODO QUE LEVA PARA A ROTA PRESTADOR
  prestador(req, res){
    return res.render('prestador', { user: req.user || {} });
  }

  async verificaUsarioExiste(req, res){ //nesse rota queremos receber dados e checar se o usuario existe na base de dados
    try{
      const numeroDoCartaoNoReq = req.body.cartao;

      const user = await Produto.findOne({ where: { cliente_cartao: numeroDoCartaoNoReq } })

      //nome e cartao que o usuario esta enviando, é o que vem do form

      //esta procurando se tem algum usuario com a chave cartao e o valor cartaoBody, ou seja o primeiro parametro é a chave e o segundo é o valor que esta sendo pego do req.body, e ele ta vendo se tem algum usuario no banco de dados com a chave cartao que tenha o mesmo valor que esta vindo do req.body

      if (!user){ //se não achar o user vai mostrar esse resposta
        console.log('Cartão Invalido')
        return res.render('produtos', { error: 'Cartão Inválido, tente novamente' });
        //res.redirect('back')
      }
      const produtos = await Produto.findAll();

      const produtosComValores = produtos.map(produto => {
        return {
          cabelo: produto.cabelo || null,
          barba: produto.barba || null,
          sobrancelha: produto.sobrancelha || null,
          nevou: produto.nevou || null,
          depilacao: produto.depilacao || null,
        };
      });
      //se chegou ate aqui quer dizer que esta tudo certo


      // Defina o número do cartão como uma variável de contexto


      // Após a validação do usuário

       // Supondo que 'id' seja o ID do usuário

      console.log(user)



      return res.render('prestador', { hit: 'Usuario Logado com Sucesso', produtos: produtosComValores });


    }catch(erro){
      return res.render('prestador', { error: 'Erro ao verificar usuário' });
    }

  }


}


export default new PrestadorController();

//vamos criar um dado na base de dados
