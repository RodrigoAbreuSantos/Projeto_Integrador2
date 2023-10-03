import Cliente from '../models/Cliente';
import Produto from '../models/Produto';

class UserController {

  async criarProduto(req, res){
    try{
      const novoUser = await Produto.create(req.body);//estamos criando os dados dos campos
      return res.json(novoUser);
  }catch(erro){
    return res.status(400).json(erro);
  }

    }
  //Criar Campos
  async store(req, res){
    try{
      const novoUser = await Cliente.create(req.body);//estamos criando os dados dos campos
      return res.json(novoUser);
  }catch(erro){
    for (let erro of e.errors){
      return res.status(400).json(erro);
    }
  }

    }

  //Mostrar Campos
  async index(req, res){
    try{
      const users = await Cliente.findAll();//vai retornar todos os usuarios que estiverem na base de dados
      return res.json(users); //em um metodo assincrono vc precisa retornar um valor
    }catch(erro){//esse erro ele não quer mostrar pro usuario, ele so quer avisar que o programa quebrou
      return res.json(null)
    }


    }


  async show(req, res){//precisamos receber um parametro
    try{
      const id = req.params.id //isso aqui vai vir na rota
      const user = await Cliente.findByPk(id);//vamos encontrar um usuario por id

      return res.json(user); //em um metodo assincrono vc precisa retornar um valor
    }catch(erro){//esse erro ele não quer mostrar pro usuario, ele so quer avisar que o programa quebrou
      return res.json(null)
    }
  }

  async update(req, res){//update vai ser uma mistura de show com store, porque vc tem que selecionar um usuario ver se ele existe e ai atualizar seus dados
    try{
      if(!req.params.id){ //se vc não tiver o id na rota, mesmo que se vc tivesse um id que não existe, vai dar esse erro, pois quer dizer que no parametro da rota vc não mandou nada depois de /users, por exemplo: /users/1
        return res.status(400).json({ //o json é para respondermos e vermos no insomnia
          errors: ['Id Não Enviado'],
        })
      }

      const id = req.params.id //isso aqui vai vir na rota
      const user = await Cliente.findByPk(id);//vamos encontrar um usuario por id na base de dados

      if(!user){//se o id não existir, vai retornar a resposta em formato de json e dentro desse json vai ter um objeto com a chave errors e dentro dessa chave os valores estão dentro de um array
        return res.status(400).json({ //o json é para respodermos e vermos no insomnia
          errors: ['Usuario Não Existe'],
        })
      }

      //aqui embaixo vc tem certeza que esta recebendo esse usuario
      const novosDados = user.update(req.body); //o que for mandando no req.body vai atualizar

      return res.json('Usuario Editado com Sucesso'); //esta retornando o usuario com os dados atualizados
    }catch(erro){//esse erro ele não quer mostrar pro usuario, ele so quer avisar que o programa quebrou
      return res.json(null)
    }
  }

  //DELETE
  async delete(req, res){//update vai ser uma mistura de show com store, porque vc tem que selecionar um usuario ver se ele existe e ai atualizar seus dados
    try{
      if(!req.params.id){ //se vc não tiver o id na rota, mesmo que se vc tivesse um id que não existe, vai dar esse erro, pois quer dizer que no parametro da rota vc não mandou nada depois de /users, por exemplo: /users/1
        return res.status(400).json({ //o json é para respondermos e vermos no insomnia
          errors: ['Id Não Enviado'],
        })
      }

      const id = req.params.id //isso aqui vai vir na rota
      const user = await Cliente.findByPk(id);//vamos encontrar um usuario por id na base de dados

      if(!user){//se o id não existir, vai retornar a resposta em formato de json e dentro desse json vai ter um objeto com a chave errors e dentro dessa chave os valores estão dentro de um array
        return res.status(400).json({ //o json é para respodermos e vermos no insomnia
          errors: ['Usuario Não Existe'],
        })
      }

      //aqui embaixo vc tem certeza que esta recebendo esse usuario
      await user.destroy(); //aqui vamos deletar o usuario com o id informado

      return res.json(user); //esta retornando o usuario com os dados atualizados
    }catch(erro){//esse erro ele não quer mostrar pro usuario, ele so quer avisar que o programa quebrou
      return res.json(null)
    }
  }

}

export default new UserController();

//vamos criar um dado na base de dados
