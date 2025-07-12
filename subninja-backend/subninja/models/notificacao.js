const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificacaoSchema = new Schema({
  titulo: { type: String, required: true },
  mensagem: { type: String, required: true },
  data_envio_programada: { type: Date, required: true },
  status: { type: String, enum: ["Desativa", "Ativa"], default: "Ativa" },
  lida: { type: Boolean, default: false },
  usuarioId: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  assinaturaId: { type: Schema.Types.ObjectId, ref: 'Assinatura', required: true },
  //canal: { type: String, enum: ["app", "email", "sms"], default: "app" },
}, {
  timestamps: true // Cria automaticamente createdAt e updatedAt
});

module.exports = mongoose.model('Notificacao', notificacaoSchema);
