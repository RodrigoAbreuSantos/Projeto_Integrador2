import { Router } from "express";
import produtosController from "../controllers/ProdutosController";
const router = new Router();

//Rota de Produtos e Serviços
router.get('/', produtosController.produtos, produtosController.mostraUsuario);

router.post('/', produtosController.verificaUsarioExiste);


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
