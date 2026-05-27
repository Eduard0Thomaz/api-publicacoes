const express = require("express");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const jsYaml = require('js-yaml');

const app = express();

app.use(cors());
app.use(express.json());

// 1. Configuração do Swagger
const swaggerFilePath = path.join(__dirname, 'swagger.yaml');
const swaggerDocument = jsYaml.load(fs.readFileSync(swaggerFilePath, 'utf8'));

// 2. Rota da documentação
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const publicacoes = [];

// Loop geração automatica das 30 publicações.
for (let i = 1; i <= 30; i++) {
    publicacoes.push({
        id: i,
        titulo: `Lançamento do Sistema Especialista - Post ${i}`,
        descricao: `Esta é a descrição detalhada do post número ${i}. Estamos validando o funcionamento completo do ecossistema de APIs integradas ao frontend na nuvem de forma responsiva.`,
        autor: i % 2 === 0 ? "Eduardo Henrique" : "Maria Silva",
        dataPublicacao: `2026-05-${String(i).padStart(2, '0')}`,
        fotoAutor: i % 2 === 0 
            ? "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150" 
            : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
    });
}

// 3. ROTA EXIGIDA: GET /posts (Retorna o JSON com todos os posts)
app.get('/posts', (req, res) => {
    res.json(publicacoes);
});

// 4. Sua rota padrão
app.get('/', (req, res) => {
    res.send('Sou o Projeto de Node + Express! Acesse /posts para ver os dados ou /api-docs para o Swagger.');
});

// O Render define automaticamente a porta pela variável de ambiente process.env.PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso!`);
    console.log(`Local: http://localhost:${PORT}/posts`);
});