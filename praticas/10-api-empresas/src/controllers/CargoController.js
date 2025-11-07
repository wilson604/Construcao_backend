import express from "express";
import Cargo from "../models/CargoModel.js";

const router = express.Router();

// Criar cargo
router.post("/", async (req, res) => {
  try {
    const cargo = await Cargo.create(req.body);
    res.status(201).json(cargo);
  } catch (error) {
    res.status(400).json({ erro: "Erro ao criar cargo", detalhes: error.message });
  }
});

// Listar todos
router.get("/", async (req, res) => {
  try {
    const cargos = await Cargo.find();
    res.status(200).json(cargos);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao listar cargos", detalhes: error.message });
  }
});

// Buscar por ID
router.get("/:id", async (req, res) => {
  try {
    const cargo = await Cargo.findById(req.params.id);
    if (!cargo) return res.status(404).json({ erro: "Cargo não encontrado" });
    res.status(200).json(cargo);
  } catch (error) {
    res.status(400).json({ erro: "Erro ao buscar cargo", detalhes: error.message });
  }
});

// Atualizar
router.put("/:id", async (req, res) => {
  try {
    const cargo = await Cargo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cargo) return res.status(404).json({ erro: "Cargo não encontrado" });
    res.status(200).json(cargo);
  } catch (error) {
    res.status(400).json({ erro: "Erro ao atualizar cargo", detalhes: error.message });
  }
});

// Deletar
router.delete("/:id", async (req, res) => {
  try {
    const cargo = await Cargo.findByIdAndDelete(req.params.id);
    if (!cargo) return res.status(404).json({ erro: "Cargo não encontrado" });
    res.status(200).json({ mensagem: "Cargo removido com sucesso" });
  } catch (error) {
    res.status(400).json({ erro: "Erro ao remover cargo", detalhes: error.message });
  }
});

export default router;
