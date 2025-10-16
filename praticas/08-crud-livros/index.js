const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const app = express()

app.use(express.json())

const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_NAME = process.env.DB_NAME

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`
  )
    .then(() => console.log('Conectado ao MongoDB Atlas!'))
    .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));
  
  //  Modelo do Livro 
  const Livro = mongoose.model('Livro', {
    titulo: String,
    autor: String,
    editora: String,
    ano: Number,
    preco: Number
  });
  
  // [CREATE] Criar um novo livro
  app.post('/livros', async (req, res) => {
    try {
      const livro = await Livro.create(req.body);
      res.status(201).json(livro);
    } catch (error) {
      res.status(400).json({ message: 'Erro ao criar livro', error });
    }
  });
  
  // [READ] Listar todos os livros
  app.get('/livros', async (req, res) => {
    try {
      const livros = await Livro.find();
      res.status(200).json(livros);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar livros', error });
    }
  });
  
  // [READ] Buscar livro por ID
  app.get('/livros/:id', async (req, res) => {
    try {
      const livro = await Livro.findById(req.params.id);
      if (!livro) return res.status(404).json({ message: 'Livro não encontrado' });
      res.status(200).json(livro);
    } catch (error) {
      res.status(400).json({ message: 'ID inválido', error });
    }
  });
  
  // [UPDATE] Atualizar livro por ID
  app.put('/livros/:id', async (req, res) => {
    try {
      const livro = await Livro.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!livro) return res.status(404).json({ message: 'Livro não encontrado' });
      res.status(200).json(livro);
    } catch (error) {
      res.status(400).json({ message: 'Erro ao atualizar livro', error });
    }
  });
  
  // [DELETE] Remover livro por ID
  app.delete('/livros/:id', async (req, res) => {
    try {
      const livro = await Livro.findByIdAndDelete(req.params.id);
      if (!livro) return res.status(404).json({ message: 'Livro não encontrado' });
      res.status(200).json({ message: 'Livro removido com sucesso!' });
    } catch (error) {
      res.status(400).json({ message: 'Erro ao remover livro', error });
    }
  });
  
  app.listen(3000, () => {
    console.log("Aplicação rodando em http://localhost:3000")
})
 
