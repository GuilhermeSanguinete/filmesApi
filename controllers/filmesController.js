const fs = require('fs');
const path = require('path');
const filepath = path.join(__dirname, '../datas/filmes.json');

function loadFilmes() {
    try {
        return JSON.parse(fs.readFileSync(filepath, 'utf8'));
    }
    catch (ex) {
        console.error("Erro ao carregar filmes", ex.message);
        return null;
    }
}

function saveFilmes(filmes) {
    try {
        fs.writeFileSync(filepath, JSON.stringify(filmes, null, 2));
    } catch (ex) {
        console.error("Erro ao salvar filmes:", ex.message);
    }
}

exports.getAllFilmes = (req, res) => {
    try {
        const filmes = loadFilmes();
        res.json(filmes);
    } catch (ex) {
        console.error("Erro ao consultar filmes:", ex.message);
    }
}

exports.getFilmesById = (req, res) => {
    try {
        const filmes = loadFilmes();
        const filme = filmes.find(a => a.id === parseInt(req.params.id));
        if (!filme) return res.status(404).json({ message: 'Filme não encontrado' });
        res.json(filme);
    }
    catch (ex) {
        console.error("Erro ao consultar filme por Id:", ex.message);
    }

}

exports.createFilme = (req, res) => {
    try {
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
    catch (ex) {
        console.error("Erro ao criar filme:", ex.message);
    }
}

exports.deleteFilme = (req, res) => {
    try {
        let filmes = loadFilmes();
        const index = filmes.findIndex(b => b.id === parseInt(req.params.id));
        if (index === -1) return res.status(404).json({ message: 'Filme não encontrado' });

        const deleted = filmes.splice(index, 1);
        saveFilmes(filmes);
        res.json(deleted[0]);
    }
    catch (ex){
        console.error("Erro ao deletar filme", ex.message);
    }
};

exports.updateFilme = (req, res) => {
    try {
        const filmes = loadFilmes();
        const index = filmes.findIndex(b => b.id === parseInt(req.params.id));
        if (index === -1) return res.status(404).json({ message: 'Filme não encontrado' });

        filmes[index] = { ...filmes[index], ...req.body };
        saveFilmes(filmes);
        res.json(filmes[index]);
    }
    catch {
        console.error("Erro ao atualizar filme", ex.message);
    }
};