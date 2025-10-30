require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const LivroRouter = require('./controllers/LivroController');


const app = express();
app.use(express.json());


// Rotas
app.use('/livros', LivroRouter);


// Conexão com MongoDB Atlas
const { DB_USER, DB_PASS, DB_HOST, DB_NAME, PORT = 3000 } = process.env;


if (!DB_USER || !DB_PASS || !DB_HOST || !DB_NAME) {
console.error('Variáveis de ambiente do banco não configuradas. Verifique .env');
process.exit(1);
}


const uri = `mongodb+srv://${encodeURIComponent(DB_USER)}:${encodeURIComponent(DB_PASS)}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;


mongoose.connect(uri, {
useNewUrlParser: true,
useUnifiedTopology: true
}).then(() => {
console.log('MongoDB conectado com sucesso');
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}).catch((err) => {
console.error('Erro ao conectar no MongoDB:', err.message);
process.exit(1);
});


// tratamento de rotas não encontradas
app.use((req, res) => {
res.status(404).json({ error: 'Rota não encontrada' });
});