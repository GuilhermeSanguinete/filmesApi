require('dotenv').config();
const express = require('express');
const cors = require('cors');

const filmesRoutes = require('./routes/filmesRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/filmes', filmesRoutes);

app.use((err, req, res, next) => {
    console.error('Erro interno:', err.message);
    res.status(500).json({ success: false, message: 'Erro interno do servidor' });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`🚀 API rodando na porta ${PORT} - http://localhost:${PORT}`);
});
