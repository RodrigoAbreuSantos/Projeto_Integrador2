import Cliente from '../models/Cliente'

class CartaoController {

  //METODO QUE LEVA PARA A ROTA GERARCARD
  gerarCard(req, res){
    return res.render('gerarCard');
  }

  async teste(req, res){

    //Gerar numero sequencial
    const valorGerado = Math.floor(Math.random() * 9999) + 1000;
    if (!valorGerado){ //se não achar o user vai mostrar esse resposta
      console.log('Erro no Sistema')
      return res.render('gerarCard', { error: 'Erro no sistema, tente novamente' });
      //res.redirect('back')
    }
    const criarCartao = {
      cartao: valorGerado
    }
    const user = await Cliente.create(criarCartao);//estamos criando os dados dos campos
    return res.render('gerarCard', { success: `Cartão gerado com sucesso, seu cartão de acesso é: ${valorGerado}` });

    //console.log(req.body);
    //res.send(req.body)

  }
}

export default new CartaoController();

//vamos criar um dado na base de dados
