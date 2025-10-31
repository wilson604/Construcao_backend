const mongoose = require ('mongoose')

const schema = new mongoose.shema(
    {
        nome: { type: String, required: true },
        descricao: { type: String, required: true }
    }
)

const DepartamentoModel = mongoose.model('Departamentos', schema)

module.exports = DepartamentoModel 