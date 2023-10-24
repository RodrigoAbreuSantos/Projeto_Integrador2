import Cliente from '../models/Cliente';
import Produto from '../models/Produto';
import Recompensas from '../models/Recompensas';
import Servicos from '../models/Servicos';

class RelatorioController {
  // Método que leva para a rota de relatório
  relatorio(req, res) {
    res.render('relatorio');
  }

  async verificaUsarioExiste(req, res, next){ //nesse rota queremos receber dados e checar se o usuario existe na base de dados
    try{
      const numeroDoCartaoNoReq = req.body.cartao;

      const user = await Cliente.findOne({ where: { cartao: numeroDoCartaoNoReq } })

      if (!user){ //se não achar o user vai mostrar esse resposta
        console.log('Cartão Invalido')
        return res.render('relatorio', { error: 'Cartão Inválido, tente novamente' });
        //res.redirect('back')
      }

      const tabelaProdutos = await Produto.findAll({
        attributes: ['id', 'cliente_cartao', 'cod_servico', 'flag', 'created_at', 'updated_at'],
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

      const recompensaServicos = await Recompensas.findAll({ where: { cliente_cartao: numeroDoCartaoNoReq}})


      //Serviços ou kits adquiridos
      const servicosAdquiridos = [];
      const kitsAdquiridos = [];

      tabelaProdutos.forEach((campo) => {
        if ([1, 2, 3, 4, 5, 6].includes(campo.cod_servico)) {
          servicosAdquiridos.push({
            servico: campo.Servico.desc,
            dataCompra: new Date(campo.created_at).toLocaleDateString(),
          });
        } else if ([7, 8, 9].includes(campo.cod_servico)) {
          kitsAdquiridos.push({
            kit: campo.Servico.desc,
            dataCompra: new Date(campo.created_at).toLocaleDateString(),
          });
        }
      });


      //Utilizações
      const servicosRealizados = [];

      tabelaProdutos.forEach((campo) => {
        if (campo.flag) {
          servicosRealizados.push({
            servico: campo.Servico.desc,
            dataCompra: new Date(campo.created_at).toLocaleDateString(),
          })
        }
      });

      //Recompensas
      recompensaServicos.forEach((campo) => {
        if (!campo.flag || campo.flag){
          const dataUtilizacao = new Date(campo.created_at);
          const dia = dataUtilizacao.getDate();
          const mes = dataUtilizacao.getMonth() + 1;
          const ano = dataUtilizacao.getFullYear();
          const hora = dataUtilizacao.getHours();
          const minutos = dataUtilizacao.getMinutes();
          const segundos = dataUtilizacao.getSeconds();

          console.log('Data e Hora de utilização: ', `${dia}/${mes}/${ano} ${hora}:${minutos}:${segundos}`);
          console.log('Recompensa Adquirido', campo.desc);
        }
        if (campo.flag){
          const dataUtilizacao = new Date(campo.updated_at);
          const dia = dataUtilizacao.getDate();
          const mes = dataUtilizacao.getMonth() + 1;
          const ano = dataUtilizacao.getFullYear();
          const hora = dataUtilizacao.getHours();
          const minutos = dataUtilizacao.getMinutes();
          const segundos = dataUtilizacao.getSeconds();

          console.log('Data e Hora de utilização: ', `${dia}/${mes}/${ano} ${hora}:${minutos}:${segundos}`);
          console.log('Recompensa Utilizada', campo.desc);
        }
      })

      return res.render('relatorio', { hit: 'Usuario Logado com Sucesso', servicosAdquiridos, kitsAdquiridos, servicosRealizados });


    }catch(erro){
      return res.render('relatorio', { error: 'Erro ao verificar usuário' });
    }

  }


}

export default new RelatorioController();
