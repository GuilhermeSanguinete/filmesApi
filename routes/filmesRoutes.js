const express = require('express');
const router = express.Router();
const filmesController = require('../controllers/filmesController');

router.get('/', filmesController.getAllFilmes);
router.get('/:id', filmesController.getFilmesById);
router.post('/', filmesController.createFilme);
router.delete('/:id', filmesController.deleteFilme);
router.put('/:id', filmesController.updateFilme);
router.get('/busca/detail', filmesController.getDetalhesCatalogo);

module.exports = router;