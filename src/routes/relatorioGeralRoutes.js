import relatorioGeralController from '../controllers/RelatorioGeralController';
import express from 'express';

const router = express.Router();

// Rota para exibir o formulário de produtos
// Rota para exibir o formulário de produtos
router.get('/', relatorioGeralController.relatorio);








export default router;

