const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificacaoSchema = new Schema({
  titulo: { type: String, required: true },
  mensagem: { type: String, required: true },
  data_envio_programada: { type: Date, required: true },
  canal: { type: String, enum: ["app", "email", "sms"], default: "app" },
  status: { type: String, enum: ["Pendente", "Enviado", "Erro"], default: "Pendente" },
  lida: { type: Boolean, default: false }
}, {
  timestamps: true // Cria automaticamente createdAt e updatedAt
});

module.exports = mongoose.model('Notificacao', notificacaoSchema);
