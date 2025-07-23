const fs = require('fs');
const path = require('path');
const filepath = path.join(__dirname, '../datas/filmes.json');

function loadFilmes() {
    return JSON.parse(fs.readFileSync(filepath, 'utf8'));
}

function saveFilmes(filmes) {
    fs.writeFileSync(filepath, JSON.stringify(filmes, null, 2));
}

exports.getAllFilmes = (req, res) => {
    const filmes = loadFilmes();
    res.json(filmes);
}

exports.getFilmesById = (req, res) => {
    const filmes = loadFilmes();
    const filme = filmes.find(a => a.id === parseInt(req.params.id));
    if (!filme) return res.status(404).json({ message: 'Filme não encontrado' });
    res.json(filme);
}

exports.createFilme = (req, res) => {
    const filmes = loadFilmes();
    const newFilme = {
        id: Date.now(),
        nome: req.body.nome,
        ano: req.body.ano
    }
    filmes.push(newFilme);
    saveFilmes(filmes);
    res.status(201).json(newFilme);
}
