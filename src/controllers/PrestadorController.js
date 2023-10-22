import Cliente from '../models/Cliente'
import Produto from '../models/Produto'
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


        //console.log(numeroDoCartaoNoReq);
        //console.log(novoObjeto);
        //console.log(novoObjeto.desc);
        //console.log(novoObjeto.desc.cabelo);
        //console.log(atual)

        // Filtrar para remover itens undefined
        const descricoesValidas = atual.filter(item => item.desc !== undefined);
        console.log(descricoesValidas)

        console.log(Object.keys(req.body).length);



        const servicos = await Servicos.findAll({
          where: {
            [Op.or]: descricoesValidas
          },
          attributes: ['id', 'desc'] // Remova 'created_at' e 'updated_at'
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

        console.log(servicoProduto)

        //const updateProdutos = await Produto.update()

        //produto.forEach((campo) => console.log(campo.cod_servico) )




        //console.log(servicos)
        //const servico = await Servicos.findAll({ where: { desc: req.body } })

        return res.render('index');
      } catch (erro) {
        console.error(erro);
        return res.render('prestador', { error: 'Erro ao utilizar serviços' });
      }
    }



}





export default new PrestadorController();

//vamos criar um dado na base de dados
