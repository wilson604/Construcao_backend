import express from "express";
import Funcionario from "../models/FuncionarioModel.js";

const router = express.Router();

// Criar funcionário
router.post("/", async (req, res) => {
  try {
    const funcionario = await Funcionario.create(req.body);
    res.status(201).json(funcionario);
  } catch (error) {
    res.status(400).json({ erro: "Erro ao criar funcionário", detalhes: error.message });
  }
});

// Listar todos
router.get("/", async (req, res) => {
  try {
    const funcionarios = await Funcionario.find().populate("cargo departamento");
    res.status(200).json(funcionarios);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao listar funcionários", detalhes: error.message });
  }
});

// Buscar por ID
router.get("/:id", async (req, res) => {
  try {
    const funcionario = await Funcionario.findById(req.params.id).populate("cargo departamento");
    if (!funcionario) return res.status(404).json({ erro: "Funcionário não encontrado" });
    res.status(200).json(funcionario);
  } catch (error) {
    res.status(400).json({ erro: "Erro ao buscar funcionário", detalhes: error.message });
  }
});

// Atualizar
router.put("/:id", async (req, res) => {
  try {
    const funcionario = await Funcionario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!funcionario) return res.status(404).json({ erro: "Funcionário não encontrado" });
    res.status(200).json(funcionario);
  } catch (error) {
    res.status(400).json({ erro: "Erro ao atualizar funcionário", detalhes: error.message });
  }
});

// Deletar
router.delete("/:id", async (req, res) => {
  try {
    const funcionario = await Funcionario.findByIdAndDelete(req.params.id);
    if (!funcionario) return res.status(404).json({ erro: "Funcionário não encontrado" });
    res.status(200).json({ mensagem: "Funcionário removido com sucesso" });
  } catch (error) {
    res.status(400).json({ erro: "Erro ao remover funcionário", detalhes: error.message });
  }
});

export default router;
