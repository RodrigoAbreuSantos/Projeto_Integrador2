//Rota para o PRESTADOR DE SERVIÇOS, AQUI ELE PODE FAZER UM CRUD DO USUARIO. OU SEJA ELE PODE ADICIONAR, APAGAR ATUALIZAR E VER UM USUARIO

import { Router } from "express";
import UserController from "../controllers/UserController";
const router2 = new Router();

//Rota de Criação de usuarios no banco de dados
router2.post('/', UserController.store);

router2.get('/', UserController.index);

router2.get('/:id', UserController.show);

router2.put('/:id', UserController.update);

router2.delete('/:id', UserController.delete);



export default router2; //aqui que vai ficar as rotas





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
