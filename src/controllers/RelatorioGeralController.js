import Cliente from '../models/Cliente';
import Produto from '../models/Produto';
import Recompensas from '../models/Recompensas';
import Servicos from '../models/Servicos';
const { Op, where } = require('sequelize');

class RelatorioGeralController {
  // Método que leva para a rota de relatório
  async relatorio(req, res) {
    const cod_servicoIndividual = [1, 2, 3, 4, 5, 6];
    const servicosIndividual = await Produto.findAll({
      where: {
        cod_servico: {
          [Op.in]: cod_servicoIndividual
        }
      }
    });

    const cod_KitServico = [7 ,8, 9];
    const kitServico = await Produto.findAll({
      where: {
        cod_servico: {
          [Op.in]: cod_KitServico
        }
      }
    });

    //Dados sobre vendas
    const quantidadeVendasServicosIndividuais = servicosIndividual.length;
    const quantidadeVendasKitsServicos = kitServico.length;

    //Dados sobre utilização de serviços
    const cabelo = await Produto.count({ where: { cod_servico: 1 } });
    const barba = await Produto.count({ where: { cod_servico: 2 } });
    const sobrancelha = await Produto.count({ where: { cod_servico: 3 } });
    const limpeza = await Produto.count({ where: { cod_servico: 4 } });
    const nevou = await Produto.count({ where: { cod_servico: 5 } });
    const depilacao = await Produto.count({ where: { cod_servico: 6 } });
    const cabeloBarba = await Produto.count({ where: { cod_servico: 7 } });
    const cabeloSobrancelha = await Produto.count({ where: { cod_servico: 8 } });
    const barbaSobrancelha = await Produto.count({ where: { cod_servico: 9 } });

    const arrayServicos = [
      { nome: "Cabelo", qtd: cabelo },
      { nome: "Barba", qtd: barba },
      { nome: "Sobrancelhas", qtd: sobrancelha },
      { nome: "Limpeza", qtd: limpeza },
      { nome: "Nevou", qtd: nevou },
      { nome: "Depilação", qtd: depilacao },
      { nome: "Cabelo + Barba", qtd: cabeloBarba },
      { nome: "Cabelo + Sobrancelha", qtd: cabeloSobrancelha },
      { nome: "Barba + Sobrancelha", qtd: barbaSobrancelha },
    ];

    //




//RECOMPENSAS




    //Dados sobre recompensas
    const quantidadeRecompensaGerada = await Recompensas.count()

    //Quantidade de serviços não utilizados
    const servicosIndividuaisNaoUtilizados = await Produto.findAll({
      where: {
        cod_servico: {
          [Op.in]: cod_servicoIndividual
        },
        flag: 0
      }
    });

    const kitServicosNaoUtilizados = await Produto.findAll({
      where: {
        cod_servico: {
          [Op.in]: cod_KitServico
        },
        flag: 0
      }
    });

    const quantidadeServiçosIndividuaisNaoUtilizados = servicosIndividuaisNaoUtilizados.length;
    const quantidadeKitServicoNaoUtilizados = kitServicosNaoUtilizados.length;

    res.render('relatorioGeral', { quantidadeVendasServicosIndividuais, quantidadeVendasKitsServicos, arrayServicos, quantidadeRecompensaGerada, quantidadeServiçosIndividuaisNaoUtilizados, quantidadeKitServicoNaoUtilizados });
  }





}

export default new RelatorioGeralController();
