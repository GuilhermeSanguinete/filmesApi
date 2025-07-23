const express = require('express');
const app = express();
const filmesRoutes = require('./routes/filmesRoutes');

app.use(express.json());

app.use('/filmes', filmesRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log("API está rodando.")
})