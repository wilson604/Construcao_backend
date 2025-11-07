import express from "express";
import Projeto from "../models/ProjetoModel.js";

const router = express.Router();

// Criar projeto
router.post("/", async (req, res) => {
  try {
    const projeto = await Projeto.create(req.body);
    res.status(201).json(projeto);
  } catch (error) {
    res.status(400).json({ erro: "Erro ao criar projeto", detalhes: error.message });
  }
});

// Listar todos
router.get("/", async (req, res) => {
  try {
    const projetos = await Projeto.find().populate("departamento");
    res.status(200).json(projetos);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao listar projetos", detalhes: error.message });
  }
});

// Buscar por ID
router.get("/:id", async (req, res) => {
  try {
    const projeto = await Projeto.findById(req.params.id).populate("departamento");
    if (!projeto) return res.status(404).json({ erro: "Projeto não encontrado" });
    res.status(200).json(projeto);
  } catch (error) {
    res.status(400).json({ erro: "Erro ao buscar projeto", detalhes: error.message });
  }
});

// Atualizar
router.put("/:id", async (req, res) => {
  try {
    const projeto = await Projeto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!projeto) return res.status(404).json({ erro: "Projeto não encontrado" });
    res.status(200).json(projeto);
  } catch (error) {
    res.status(400).json({ erro: "Erro ao atualizar projeto", detalhes: error.message });
  }
});

// Deletar
router.delete("/:id", async (req, res) => {
  try {
    const projeto = await Projeto.findByIdAndDelete(req.params.id);
    if (!projeto) return res.status(404).json({ erro: "Projeto não encontrado" });
    res.status(200).json({ mensagem: "Projeto removido com sucesso" });
  } catch (error) {
    res.status(400).json({ erro: "Erro ao remover projeto", detalhes: error.message });
  }
});

export default router;
