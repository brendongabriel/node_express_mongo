import express from 'express';
import LivroController from '../controller/livroController.js';

const router = express.Router();

router.get('/livros', LivroController.listarLivros);
router.get('/livros/busca', LivroController.listarLivrosPorEditora);
router.post('/livros', LivroController.cadastrarLivro);
router.get('/livros/:id/autor', LivroController.listarLivrosPorAutor);
router.get('/livros/:id', LivroController.listarLivroPorId);
router.put('/livros/:id', LivroController.atualizarLivro);
router.delete('/livros/:id', LivroController.removerLivro);

export default router;