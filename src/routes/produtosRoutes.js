import produtosController from '../controllers/ProdutosController';
import express from 'express';

const router = express.Router();

// Rota para exibir o formulário de produtos
router.get('/', produtosController.produtos);

// Rota para processar a seleção de produtos após verificar o cartão
router.post('/', produtosController.verificaUsarioExiste, produtosController.fazerCompra);
router.post('/comprar', produtosController.processarCompra)

export default router;





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
