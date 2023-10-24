import Cliente from '../models/Cliente';
import Produto from '../models/Produto';
import Recompensas from '../models/Recompensas';
import Servicos from '../models/Servicos';
const { Op } = require('sequelize');

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
    console.log('Quantidade de Vendas de serviços individuais: ', quantidadeVendasServicosIndividuais);
    console.log('Quantidade de Vendas de kits de serviços: ', quantidadeVendasKitsServicos)

    //Dados sobre utilização de serviços


    //Dados sobre recompensas
    const quantidadeRecompensaGerada = await Recompensas.count()
    console.log('Quantidade de recompensas geradas: ', quantidadeRecompensaGerada);

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
    console.log('Quantidade Serviços individuais não utilizados: ', quantidadeServiçosIndividuaisNaoUtilizados)
    console.log('Quantidade de kits de serviços não utilizados: ', quantidadeKitServicoNaoUtilizados)


    res.render('relatorioGeral', { servicosIndividual });
  }





}

export default new RelatorioGeralController();
