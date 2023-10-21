import Cliente from '../models/Cliente'
import Produto from '../models/Produto'

class ProdutosController {

  //METODO QUE LEVA PARA A ROTA PRODUTOS
  relatorio(req, res){
    return res.render('relatorio');
  }

  async verificaUsarioExiste(req, res, next){ //nesse rota queremos receber dados e checar se o usuario existe na base de dados
    try{
      const numeroDoCartaoNoReq = req.body.cartao;

      const user = await Cliente.findOne({ where: { cartao: numeroDoCartaoNoReq } })

      //nome e cartao que o usuario esta enviando, é o que vem do form

      //esta procurando se tem algum usuario com a chave cartao e o valor cartaoBody, ou seja o primeiro parametro é a chave e o segundo é o valor que esta sendo pego do req.body, e ele ta vendo se tem algum usuario no banco de dados com a chave cartao que tenha o mesmo valor que esta vindo do req.body

      if (!user){ //se não achar o user vai mostrar esse resposta
        console.log('Cartão Invalido')
        return res.render('relatorio', { error: 'Cartão Inválido, tente novamente' });
        //res.redirect('back')
      }

      //se chegou ate aqui quer dizer que esta tudo certo


      // Defina o número do cartão como uma variável de contexto


      // Após a validação do usuário

      req.session.userId = user.id; // Supondo que 'id' seja o ID do usuário

      next()

      return res.render('relatorio', { hit: 'Usuario Logado com Sucesso' });


    }catch(erro){
      return res.render('relatorio', { error: 'Erro ao verificar usuário' });
    }

  }

  async mostrarRelatorio(req, res, next) {
    try {
      if (req.session.userId) {
         // Obtenha os produtos selecionados do corpo da requisição
        const id = req.session.userId
        // Exibe os produtos selecionados e o ID do usuário no console (apenas para fins de depuração)
     

        console.log('Req Body: ', req.body, 'Req Id:', req.session.userId)



        /*const user = await Produto.create({
          "produtos": ["barba", "sobrancelha", "limpeza"],
          "cliente_id": 1
        })
        */

        // Renderize uma página ou mensagem de confirmação com os produtos selecionados




      } else {
        throw new Error('Número do cartão não encontrado na sessão.');
      }
    } catch (erro) {
      console.error('Erro em processarCompra:', erro);
      return res.render('relatorio', { error: erro.message });
    }

  }
}

export default new ProdutosController();

//vamos criar um dado na base de dados
