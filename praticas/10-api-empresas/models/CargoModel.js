const mongoose = require('mongoose')

const schema = new mongoose.schema(
    {
        nome:{ type: String, required: true},
        descrição: { type: String, required: true},
        salario: { type: Number, required: true},
    }
)

const CargoModel = mongoose.model('Cargos', schema)

modeule.exports = CargoModel