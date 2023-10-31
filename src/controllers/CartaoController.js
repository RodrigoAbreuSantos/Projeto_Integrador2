import Cliente from '../models/Cliente'

class CartaoController {

  //METODO QUE LEVA PARA A ROTA GERARCARD
  async gerarCard(req, res){


    return res.render('gerarCard');
  }

  async teste(req, res) {
    let valorGerado;
    const cartoesGerados = [];

    const cartaoCliente = await Cliente.findAll();
    cartaoCliente.forEach((campo) => cartoesGerados.push(campo.cartao));

    valorGerado = valorGerado = Math.floor(Math.random() * 9000) + 1000;
    if (cartoesGerados.includes(valorGerado)) {
      return res.render('gerarCard', { success: `Tente Novamente, acontece que o cartão que havia gerado era um cartão ja existente` });
    } else {
      const criarCartao = {
        cartao: valorGerado,
      };

      const user = await Cliente.create(criarCartao);
      return res.render('gerarCard', { success: `Cartão gerado com sucesso, seu cartão de acesso é: ${valorGerado}` });
    }
  }

}



export default new CartaoController();

//vamos criar um dado na base de dados
