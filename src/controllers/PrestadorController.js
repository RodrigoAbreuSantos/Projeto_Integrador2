import Cliente from '../models/Cliente'
import Produto from '../models/Produto'
import Recompensas from '../models/Recompensas';
import Servicos from '../models/Servicos';
const { Op } = require('sequelize');


class PrestadorController {

  //METODO QUE LEVA PARA A ROTA PRESTADOR
  prestador(req, res){
    return res.render('prestador', { user: req.user || {} });
  }

  async verificaUsarioExiste(req, res){ //nesse rota queremos receber dados e checar se o usuario existe na base de dados
    try{
      const numeroDoCartaoNoReq = req.body.cartao;
      req.session.numeroDoCartao = numeroDoCartaoNoReq;

      const user = await Produto.findOne({ where: { cliente_cartao: numeroDoCartaoNoReq } })


      //nome e cartao que o usuario esta enviando, é o que vem do form

      //esta procurando se tem algum usuario com a chave cartao e o valor cartaoBody, ou seja o primeiro parametro é a chave e o segundo é o valor que esta sendo pego do req.body, e ele ta vendo se tem algum usuario no banco de dados com a chave cartao que tenha o mesmo valor que esta vindo do req.body

      if (!user){ //se não achar o user vai mostrar esse resposta
        console.log('Cartão Invalido')
        return res.render('produtos', { error: 'Cartão Inválido, tente novamente' });
        //res.redirect('back')
      }

       //Acesse a flag a partir da variável de sessão
      const flag = req.session.flag;


      const servicos = await Produto.findAll({
        attributes: ['id', 'flag', 'created_at', 'updated_at'],
        where: {
          cliente_cartao: numeroDoCartaoNoReq,
        },
        include: [
          {
            model: Servicos,
            attributes: ['id', 'desc'],
          },
        ],
      })

      const totalFlagsVerdadeiras = servicos.filter(produto => produto.flag === true).length;
      console.log('TOTAL FLAG VERDADEIRA: ', totalFlagsVerdadeiras)

      const tabelaRecompensa = {
        desc: "Corte Completo",
        cliente_cartao: numeroDoCartaoNoReq,
        flag: false
      }

      const totalRegistros = await Recompensas.count();
      console.log('Total de Registros de Recompensas:', totalRegistros);

      if (totalFlagsVerdadeiras > 2 && totalRegistros === 0){
        const recompensa = await Recompensas.create(tabelaRecompensa)
        console.log(recompensa)
      }

      const mostrarRecompensas = await Recompensas.findAll({ where: { cliente_cartao: numeroDoCartaoNoReq }})



      if (servicos.length > 0) {
        return res.render('prestador', { hit: 'Usuário Logado com Sucesso', servicos, flag, mostrarRecompensas });
      } else {
        return res.render('prestador', { error: 'Nenhum serviço associado a este usuário' });
      }
    } catch (erro) {
      return res.render('prestador', { error: 'Erro ao verificar usuário' });
    }


    }




    async utilizarServicos(req, res) {
      try {
        const totalServico = Object.keys(req.body).length;
        const numeroDoCartaoNoReq = req.session.numeroDoCartao;
        const bodyString = req.body
        const novoObjeto = {
          desc: req.body,
        };

        const atual = [
          {desc: novoObjeto.desc.cabelo},
          {desc: novoObjeto.desc.barba},
          {desc: novoObjeto.desc.sobrancelha},
          {desc: novoObjeto.desc.limpeza},
          {desc: novoObjeto.desc.nevou},
          {desc: novoObjeto.desc.depilacao}
        ]

        // Filtrar para remover itens undefined
        const descricoesValidas = atual.filter(item => item.desc !== undefined);
        console.log(descricoesValidas)

        console.log(Object.keys(req.body).length);



        const servicos = await Servicos.findAll({
          where: {
            [Op.or]: descricoesValidas
          },
          attributes: ['id', 'desc']
        });

        //Esta retornado os id da variavel serviços
        const servicosId = servicos.map((item) => item.id);
        console.log(servicosId)


        const servicoProduto = await Produto.findAll({ where:
          {
          cliente_cartao: numeroDoCartaoNoReq,
          cod_servico: servicosId
        }
      })

      servicoProduto.forEach(async (campo) => {
        await Produto.update({ flag: true }, { where: { id: campo.id } });
        req.session.flag = true; // Defina a flag na sessão
      });


        return res.render('prestador');
      } catch (erro) {
        console.error(erro);
        return res.render('prestador', { error: 'Erro ao utilizar serviços' });
      }
    }

    async utilizarRecompensas(req, res) {
      try {
        const numeroDoCartaoNoReq = req.session.numeroDoCartao;

        // Atualize as recompensas definindo a flag como 'true' para indicar que foram usadas.
        const utilizarRecompensas = await Recompensas.update({ flag: true }, {
          where: { cliente_cartao: numeroDoCartaoNoReq, flag: false }
        });

        console.log(utilizarRecompensas); // Isso mostrará quantas recompensas foram atualizadas.

        return res.redirect(302, '/prestador');
      } catch (erro) {
        console.error(erro);
        return res.redirect(302, '/prestador');
      }
    }

}





export default new PrestadorController();

//vamos criar um dado na base de dados
