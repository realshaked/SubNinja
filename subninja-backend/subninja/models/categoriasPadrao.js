const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoriasPadraoSchema = new Schema({
  nome: { type: String, required: true, unique: true },
  cor: { type: String, default: "" },
  icone: { type: String, default: "" },
  descricao: { type: String, default: "" },
  ativa: { type: Boolean, default: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('CategoriasPadrao', categoriasPadraoSchema);