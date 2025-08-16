const fs = require('fs');
const path = require('path');
const filepath = path.join(__dirname, '../datas/filmes.json');

// Funções utilitárias
function loadFilmes() {
    try {
        const data = fs.readFileSync(filepath, 'utf8');
        return JSON.parse(data);
    } catch (ex) {
        console.error("Erro ao carregar filmes:", ex.message);
        return [];
    }
}

function saveFilmes(filmes) {
    try {
        fs.writeFileSync(filepath, JSON.stringify(filmes, null, 2));
    } catch (ex) {
        console.error("Erro ao salvar filmes:", ex.message);
    }
}

function findFilmeIndexById(filmes, id) {
    return filmes.findIndex(f => f.id === id);
}

// Rotas
exports.getAllFilmes = (req, res) => {
    const filmes = loadFilmes();
    res.json({ success: true, data: filmes });
};

exports.getFilmesById = (req, res) => {
    const filmes = loadFilmes();
    const filme = filmes.find(f => f.id === parseInt(req.params.id));
    if (!filme) {
        return res.status(404).json({ success: false, message: 'Filme não encontrado' });
    }
    res.json({ success: true, data: filme });
};

exports.createFilme = (req, res) => {
    try {
        const { nome, ano, categoria, assistido } = req.body;

        if (!nome || !ano || !categoria) {
            return res.status(400).json({ success: false, message: 'Campos obrigatórios: nome, ano, categoria' });
        }

        const filmes = loadFilmes();
        const newFilme = {
            id: Date.now(),
            nome,
            ano,
            categoria,
            assistido: assistido ?? false
        };
        filmes.push(newFilme);
        saveFilmes(filmes);

        res.status(201).json({ success: true, data: newFilme });
    }
    catch (error){
        res.status(400).json({ error: 'Erro ao cadastar novo filme.'})
    }
};

exports.deleteFilme = (req, res) => {
    const filmes = loadFilmes();
    const index = findFilmeIndexById(filmes, parseInt(req.params.id));

    if (index === -1) {
        return res.status(404).json({ success: false, message: 'Filme não encontrado' });
    }

    const [deleted] = filmes.splice(index, 1);
    saveFilmes(filmes);

    res.json({ success: true, data: deleted });
};

exports.updateFilme = (req, res) => {
    const filmes = loadFilmes();
    const index = findFilmeIndexById(filmes, parseInt(req.params.id));

    if (index === -1) {
        return res.status(404).json({ success: false, message: 'Filme não encontrado' });
    }

    filmes[index] = { ...filmes[index], ...req.body };
    saveFilmes(filmes);

    res.json({ success: true, data: filmes[index] });
};

exports.getDetalhesCatalogo = (req, res) => {
    const filmes = loadFilmes();
    res.json({
        success: true,
        data: {
            tamanho: filmes.length,
            ultimoCadastro: filmes.length ? filmes[filmes.length - 1].nome : null
        }
    });
};
