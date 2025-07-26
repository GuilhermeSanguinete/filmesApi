# 🎬 Filmes API

Uma API REST simples feita com Node.js e Express para gerenciar filmes. Este projeto foi desenvolvido com fins didáticos e é ideal para praticar os fundamentos de um back-end básico com rotas, controllers e persistência em JSON.

## 🚀 Funcionalidades

- ✅ Listar todos os filmes
- 🔍 Buscar filme por ID
- ➕ Adicionar novo filme
- ✏️ Atualizar um filme existente
- ❌ Deletar um filme

## 🛠 Tecnologias

- Node.js
- Express.js
- JSON como armazenamento (simulando banco de dados)
- Nodemon para ambiente de desenvolvimento

## 📁 Estrutura

filmes-api/  
├── server.js  
├── routes/  
│   └── filmes.js  
├── controllers/  
│   └── filmesController.js  
├── data/  
│   └── filmes.json  
├── README.md  
├── package-lock.json  
└── package.json  

## ▶️ Como executar

1. Clone o repositório:
git clone https://github.com/GuilhermeSanguinete/filmesApi.git
cd filmesapi

2. Instale as dependências:
npm install

3. Execute a API:
npm run dev

4. Acesse: `http://localhost:3000/filmes`

## 📬 Exemplos de Requisições

### POST /filmes
json->

{
  "nome": "John Wick",
  "ano": 2014,
  "categoria": "Ação",
  "assistido": false
}
### PUT /filmes/:id
json->

{
  "nome": "Toy Story",
  "ano": 1995,
  "categoria": "Animação",
  "assistido": true
}

## 📌 Objetivo
Esse projeto é parte do meu estudo com Node.js e tem como objetivo consolidar a lógica de rotas, controllers e persistência básica.