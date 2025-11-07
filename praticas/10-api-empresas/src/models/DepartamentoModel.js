const mongoose = require('mongoose');

const DepartamentoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  localizacao: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.models.Departamento || mongoose.model('Departamento', DepartamentoSchema);
