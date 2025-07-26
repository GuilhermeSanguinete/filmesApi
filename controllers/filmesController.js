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
        ano: req.body.ano,
        categoria: req.body.categoria,
        assistido: req.body.assistido
    }
    filmes.push(newFilme);
    saveFilmes(filmes);
    res.status(201).json(newFilme);
}

exports.deleteFilme = (req, res) => {
  let filmes = loadFilmes();
  const index = filmes.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Filme não encontrado' });

  const deleted = filmes.splice(index, 1);
  saveFilmes(filmes);
  res.json(deleted[0]);
};

exports.updateFilme = (req, res) => {
  const filmes = loadFilmes();
  const index = filmes.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Filme não encontrado' });

  filmes[index] = { ...filmes[index], ...req.body };
  saveFilmes(filmes);
  res.json(filmes[index]);
};