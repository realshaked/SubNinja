const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoriaSchema = new Schema({
  nome: { type: String, required: true },
  cor: { type: String, default: "" },
  icone: { type: String, default: "" }
});

module.exports = mongoose.model('Categoria', categoriaSchema);