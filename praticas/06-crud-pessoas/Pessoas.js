const express = require('express')
const router = express.Router()

// lista de pessoas pra simular o banco de dados
let listaPessoas = [
  {
    id: 1,
    nome: "joão",
    cpf: "04585236920",
    email: "joao@pedro.com",
    dataNascimento: "10/06/2000"
  },
  {
    id: 2,
    nome: "kaio",
    cpf: "04585236920",
    email: "kaio@pedro.com",
    dataNascimento: "11/07/2001"
  }
]

// GET /pessoas
router.get('/pessoas', (req, res) => {
  res.json(listaPessoas)
})

// #busca por id
//GET /pessoas/:id
router.get('/pessoas/:id', (req,res, next) => {
    //rebendo ID como parametro dinãmico
    const id = req.params.id
    //faço a busca na lista de pessoas pelo id recebido 
    const pessoa = listaPessoas.find(pessoa => pessoa.id == id)
    if(!pessoa) {
        return res.status(404).json({ error: "Pessoa não encontrada!!!"})
    }
    res.json(pessoa)
})


// exportar corretamente
module.exports = router
