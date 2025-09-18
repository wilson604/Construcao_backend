const express = require('express')
const app = express()

//configurar e mapear os intermediários
const cors = require('cors')
app.use(cors())// habilitar o CORS do browser 
app.use(express.json()) //receber JSON no body 

//mapear os meus routes 
const pessoasRouter = require('./Pessoas')
app.use(pessoasRouter)


//executar a aplicação 
app.listen(3000, () => {
    console.log("Aplicação rodando em http://localhost:3000")
})