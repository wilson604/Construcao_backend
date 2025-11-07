// Importações principais
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Importação dos controllers
import departamentoController from "./controllers/DepartamentoController.js";
import cargoController from "./controllers/CargoController.js";
import funcionarioController from "./controllers/FuncionarioController.js";
import projetoController from "./controllers/ProjetoController.js";
import tarefaController from "./controllers/TarefaController.js";

// Configuração do dotenv (carrega variáveis de ambiente)
dotenv.config();

// Inicializa o app Express
const app = express();

// Middlewares globais
app.use(express.json());
app.use(cors());

// Porta definida no .env ou 3000 como padrão
const PORT = process.env.PORT || 3000;

// Conexão com o MongoDB Atlas usando variáveis do .env
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado ao MongoDB Atlas"))
  .catch((err) => console.error("❌ Erro ao conectar ao MongoDB:", err));

// Rotas principais
app.use("/departamentos", departamentoController);
app.use("/cargos", cargoController);
app.use("/funcionarios", funcionarioController);
app.use("/projetos", projetoController);
app.use("/tarefas", tarefaController);

// Rota inicial (teste)
app.get("/", (req, res) => {
  res.send("🚀 API de Gerenciamento de Empresas está rodando com sucesso!");
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
