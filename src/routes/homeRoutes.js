import { Router } from "express";
import homeController from "../controllers/HomeController";
const router = new Router();

//Rota Inicial
router.get('/', homeController.index) //ele esta jogando as funções do controller diretamente aqui, elas que recebem a requisição do usario e enciam uma resposta, dependendo do metodo, se for get pega a requisição do usuario se for post manda uma resposta
router.post('/', homeController.teste)

//Rota de Gerar Cartão
router.get('/gerarCard', homeController.gerarCard);

//Rota de Produtos e Serviços
router.get('/produtos', homeController.produtos);

router.post('/produtos', homeController.verificaUsarioExiste)


export default router; //aqui que vai ficar as rotas




/*
Em cada controller pode ter até 5 metodos

index ==> lista todos os usuarios. Quando é index é GET
store/create ==. cria um novo usuario. Quando é store/create é POST
delete ==> Apaga um usuario. Quando é delete é DELETE
show ==> mostra um usuario. Quando é show é GET
update ==> atualiza um usuario. Quando é update é PATCH ou PUT

PATCH ==> quando vc altera somente um valor
PUT ==> Quando vc pega um objeto inteiro e substitui ele por outro objeto inteiro
*/
