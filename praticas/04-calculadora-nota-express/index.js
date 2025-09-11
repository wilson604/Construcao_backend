// importa o express
const express = require('express');
// crio uma instância do express
const app = express();

// importar o lib cors
const cors = require('cors');
// Habilita o browser para mandar requisição pro seu backend local
app.use(cors());

// Middlewares (Intermediários)
// Intermediário de log
app.use((req, res, next) => {
  console.log("-------------####-------------");
  console.log("Tempo: ", new Date().toLocaleString());
  console.log("Método: ", req.method);
  console.log("Rota: ", req.url);
  next();
});

// Rota simples de teste
app.get('/nome', (req, res) => {
  const primeiroNome = req.query.primeiroNome;
  const sobreNome = req.query.sobreNome;

  res.send("Olá " + primeiroNome + " " + sobreNome + "!!!");
});

// Importando o router calculadora
const calculadoraRouter = require('./routes/calculadora');

// Toda requisição que chegar na rota /calculadora vai para o router
app.use('/calculadora', calculadoraRouter);

// executar a aplicação
app.listen(3000, () => {
  console.log("Aplicação rodando em http://localhost:3000");
});
