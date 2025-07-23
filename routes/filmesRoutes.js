const express = require('express');
const router = express.Router();
const filmesController = require('../controllers/filmesController');

router.get('/', filmesController.getAllFilmes);
router.get('/:id', filmesController.getFilmesById);
router.post('/', filmesController.createFilme);

module.exports = router;