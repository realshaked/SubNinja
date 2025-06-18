const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificacaoSchema = new Schema({
  titulo: { type: String, required: true },
  mensagem: { type: String, required: true },
  lida: { type: Boolean, default: false }
});

module.exports = mongoose.model('Notificacao', notificacaoSchema);