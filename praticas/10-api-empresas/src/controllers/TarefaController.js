import express from "express";
import Tarefa from "../models/TarefaModel.js";

const router = express.Router();

// Criar tarefa
router.post("/", async (req, res) => {
  try {
    const tarefa = await Tarefa.create(req.body);
    res.status(201).json(tarefa);
  } catch (error) {
    res.status(400).json({ erro: "Erro ao criar tarefa", detalhes: error.message });
  }
});

// Listar todas
router.get("/", async (req, res) => {
  try {
    const tarefas = await Tarefa.find().populate("projeto");
    res.status(200).json(tarefas);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao listar tarefas", detalhes: error.message });
  }
});

// Buscar por ID
router.get("/:id", async (req, res) => {
  try {
    const tarefa = await Tarefa.findById(req.params.id).populate("projeto");
    if (!tarefa) return res.status(404).json({ erro: "Tarefa não encontrada" });
    res.status(200).json(tarefa);
  } catch (error) {
    res.status(400).json({ erro: "Erro ao buscar tarefa", detalhes: error.message });
  }
});

// Atualizar
router.put("/:id", async (req, res) => {
  try {
    const tarefa = await Tarefa.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tarefa) return res.status(404).json({ erro: "Tarefa não encontrada" });
    res.status(200).json(tarefa);
  } catch (error) {
    res.status(400).json({ erro: "Erro ao atualizar tarefa", detalhes: error.message });
  }
});

// Deletar
router.delete("/:id", async (req, res) => {
  try {
    const tarefa = await Tarefa.findByIdAndDelete(req.params.id);
    if (!tarefa) return res.status(404).json({ erro: "Tarefa não encontrada" });
    res.status(200).json({ mensagem: "Tarefa removida com sucesso" });
  } catch (error) {
    res.status(400).json({ erro: "Erro ao remover tarefa", detalhes: error.message });
  }
});

export default router;
