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

//#criação
// POST /pessoas 

router.post('/pessoas', (req, res, next) => {
  const { nome, cpf, email, dataNascimento } = req.body
  //validando se os campos foram preeenchidos 
  if(!nome || !cpf || !email || !dataNascimento){
    return res.status(400).json({ error: "Nome, cpf, email e DataNascimento são obrigatórios!!!"})
  }
  //validar se o cpf ja foi cadastrado 
  if(listaPessoas.some(pessoa => pessoa.cpf == cpf)){
    return res.status(409).json({ error: "CPF já cadastrado!!!"})
  }

  const novaPessoa = {
    id: Date.now(),
    nome,
    cpf,
    email,
    dataNascimento
  }

  listaPessoas.push(novaPessoa)
  res.status(201).json({ message: "Pessoa cadastrada com sucesso", novaPessoa})
})

//#Atualização 
// PUT ou PATH /pessoas/:id 
router.put('/pessoas/:id', (req, res, next) => {
  const id = req.params.id
  const pessoa = listaPessoas.find(pessoa => pessoa.id == id)
  // valido se a pessoa existe 
  if(!pessoa){
    return res.status(404).json({ error: "Pessoa não encontrada!!!"})
  }
  const { nome, email, dataNascimento } = req.body
  if(!nome || !email || !dataNascimento){
    return res.status(400).json({ error: "nome, email, dataNascimento são obrigatórios"})
  }
  // atualizo os dados da pessoa 
  pessoa.nome = nome 
  pessoa.email = email 
  pessoa.dataNascimento = dataNascimento
  // responde com os dados da pessoa atualizados 
  res.json({ message: "Pessoa atulizada com sucesso!!!", pessoa })
})

// #Remoção 
// DELETE /pessoas/:id
router.delete('/pessoas/:id', (req, res, next) => {
  const id = req.params.id
  //
  const pessoa = listaPessoas.find(pessoa => pessoa.id == id)
  if (!pessoa) {
    return res.status(404).json({error: "pessoa não encontrada!!!" })
  }

  listaPessoas = listaPessoas.filter(pessoa => pessoa.id != id)
  res.json({ message: "Pessoa excluida com sucesso!!!"})
})
// exportar corretamente
module.exports = router
