const express = require('express');
const router = express.Router();
const filmesController = require('../controllers/filmesController');

router.get('/busca/detail', filmesController.getDetalhesCatalogo);

router.get('/:id', filmesController.getFilmesById);

router.get('/', filmesController.getAllFilmes);
router.post('/', filmesController.createFilme);
router.delete('/:id', filmesController.deleteFilme);
router.put('/:id', filmesController.updateFilme);

module.exports = router;