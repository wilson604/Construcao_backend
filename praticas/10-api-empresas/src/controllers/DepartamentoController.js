import express from "express";
import Departamento from "../models/DepartamentoModel.js";

const router = express.Router();

// Criar departamento
router.post("/", async (req, res) => {
  try {
    const departamento = await Departamento.create(req.body);
    res.status(201).json(departamento);
  } catch (error) {
    res.status(400).json({ erro: "Erro ao criar departamento", detalhes: error.message });
  }
});

// Listar todos
router.get("/", async (req, res) => {
  try {
    const departamentos = await Departamento.find();
    res.status(200).json(departamentos);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao listar departamentos", detalhes: error.message });
  }
});

// Buscar por ID
router.get("/:id", async (req, res) => {
  try {
    const departamento = await Departamento.findById(req.params.id);
    if (!departamento) return res.status(404).json({ erro: "Departamento não encontrado" });
    res.status(200).json(departamento);
  } catch (error) {
    res.status(400).json({ erro: "Erro ao buscar departamento", detalhes: error.message });
  }
});

// Atualizar
router.put("/:id", async (req, res) => {
  try {
    const departamento = await Departamento.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!departamento) return res.status(404).json({ erro: "Departamento não encontrado" });
    res.status(200).json(departamento);
  } catch (error) {
    res.status(400).json({ erro: "Erro ao atualizar departamento", detalhes: error.message });
  }
});

// Deletar
router.delete("/:id", async (req, res) => {
  try {
    const departamento = await Departamento.findByIdAndDelete(req.params.id);
    if (!departamento) return res.status(404).json({ erro: "Departamento não encontrado" });
    res.status(200).json({ mensagem: "Departamento removido com sucesso" });
  } catch (error) {
    res.status(400).json({ erro: "Erro ao remover departamento", detalhes: error.message });
  }
});

export default router;
