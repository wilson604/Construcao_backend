const express = require('express')
const router = express.Router()

const DepartamentoModel = require('../models/DepartamentoModel')
const { validarDepartamento } = require('../validators/DepartamentoValidator')

//crud
router.get('/departamentos' , async (req, res, next) => {
    const departamentos = await DepartamentoModel.find()
    res.json(departamentos)
})

router.get('/departamentos/:id', async (req, res, next) => {
    const departamentoEncontrado = await DepartamentoModel.findById(req.params.id)
    if (!departamentoEncontrado) {
        return res.status(404).json({ erro: "Não encontrado"})
    }
    res.json(departamentoEncontrado)
})

router.post('departamentos', validarDepartamento, async (req,res, next) => {
    const departamendoCriado = await DepartamentoModel.create(req.body)
    res.status(201).json(departamendoCriado)
})

router.put('/departamentos/:id', validarDepartamento, async (req,res, next) => {
    const departamentoAtualizado = await DepartamentoModel.findByIdAndUpadate(
        req.params.id, req.body, { new:true })
        if (!departamentoAtualizado) {
            return res.status(404).json({ erro: "Não encontrado"})
        }
    res.json(departamentoAtualizado)
})

router.delete('/departamentos/:id', async(req, res,next) => {
    await Departamentomodel
})