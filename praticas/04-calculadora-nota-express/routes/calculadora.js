// importar o express
const express = require('express')
// criar um router(Roteador)
const router = express.Router()

// Somar
router.get('/somar', (req, res) => {
    const { numA, numB } = req.query;
    const resultado = Number(numA) + Number(numB);
    res.json({ operacao: "soma", resultado });
  });
  
  // Subtrair
  router.get('/subtrair', (req, res) => {
    const { numA, numB } = req.query;
    const resultado = Number(numA) - Number(numB);
    res.json({ operacao: "subtração", resultado });
  });
  
  // Multiplicar
  router.get('/multiplicar', (req, res) => {
    const { numA, numB } = req.query;
    const resultado = Number(numA) * Number(numB);
    res.json({ operacao: "multiplicação", resultado });
  });
  
  // Dividir
  router.get('/dividir', (req, res) => {
    const { numA, numB } = req.query;
    if (Number(numB) === 0) {
      return res.status(400).json({ erro: "Divisão por zero não é permitida." });
    }
    const resultado = Number(numA) / Number(numB);
    res.json({ operacao: "divisão", resultado });
  });
  
  // Ao quadrado
  router.get('/aoQuadrado', (req, res) => {
    const { numA } = req.query;
    const resultado = Math.pow(Number(numA), 2);
    res.json({ operacao: "ao quadrado", resultado });
  });
  
  // Raiz quadrada
  router.get('/raizQuadrada', (req, res) => {
    const { numA } = req.query;
    if (Number(numA) < 0) {
      return res.status(400).json({ erro: "Não existe raiz quadrada real de número negativo." });
    }
    const resultado = Math.sqrt(Number(numA));
    res.json({ operacao: "raiz quadrada", resultado });
  });
  
  module.exports = router;