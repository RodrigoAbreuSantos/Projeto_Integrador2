import Cliente from '../models/Cliente'
import Produto from '../models/Produto'
import Servicos from '../models/Servicos';

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

      const servicos = await Produto.findAll({
        attributes: ['id', 'created_at', 'updated_at'],
        include: [
          {
            model: Servicos,
            attributes: ['id', 'desc'],
          },
        ],
      })

      servicos.forEach((produto) => {
        console.log(produto)
        console.log(`ID: ${produto.id}`);
        console.log(`Data de Criação: ${produto.created_at}`);
        console.log(`Data de Atualização: ${produto.updated_at}`);
        console.log(`Serviço ID: ${produto.Servico.id}`); // Acesse o ID do Servico assim
        console.log(`Descrição do Serviço: ${produto.Servico.desc}`);
      })
      console.log('Serviços', servicos)

      if (servicos.length > 0) {
        return res.render('prestador', { hit: 'Usuário Logado com Sucesso', servicos });
      } else {
        return res.render('prestador', { error: 'Nenhum serviço associado a este usuário' });
      }
    } catch (erro) {
      return res.render('prestador', { error: 'Erro ao verificar usuário' });
    }

    }catch(erro){
      return res.render('prestador', { error: 'Erro ao verificar usuário' });
    }

    utilizarServicos(req, res){
      const totalServico = Object.keys(req.body).length
      if (totalServico > 2){
        
      }
      console.log(req.body)
      console.log(Object.keys(req.body).length)
      return res.render('index');
    }



}





export default new PrestadorController();

//vamos criar um dado na base de dados
