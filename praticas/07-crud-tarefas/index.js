const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const app = express()

app.use(express.json())

const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_NAME = process.env.DB_NAME

// conectar no banco Mongo 

const url = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(url)
    .then(() => {
        console.log("Conectado ao MongoDB")
    })
    .catch(err => {
        console.log('Erro ao conectar no MongoDB: ' , err)
    })

    app.listen(3000, () => {
        console.log("Aplicação rodando em http://localhost:3000")
    })