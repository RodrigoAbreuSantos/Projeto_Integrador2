import prestadorController from '../controllers/PrestadorController';
import express from 'express';

const router = express.Router();

// Rota para exibir o formulário de produtos
router.get('/', prestadorController.prestador);
router.post('/', prestadorController.verificaUsarioExiste);


export default router;

