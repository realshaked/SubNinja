const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assinaturaSchema = new Schema({
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    nome: { type: String, required: true },
    categoriaId: { type: Schema.Types.ObjectId, ref: "Categoria", required: false, default: null },
    valor: { type: Number, required: true },
    plano: { type: String, required: true },
    metodoPagamento: { type: String, required: true },
    frequencia: { type: String, required: true, enum: ['mensal', 'trimestral', 'semestral', 'anual', 'semanal'] },
    dataAssinatura: { type: Date, required: true, default: Date.now },
    dataVencimento: { type: Date,},
    notificacao: { type: String, required: true },
    linkCancelamento: { type: String, default: "" }
});

module.exports = mongoose.model('Assinatura', assinaturaSchema);