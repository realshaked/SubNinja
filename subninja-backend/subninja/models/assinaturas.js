const mongooose = require('mongoose');
const Schema = mongooose.Schema;

const assinaturaSchema = new Schema({
  nome: { type: String, required: true },
    categoriaId: { type: Schema.Types.ObjectId, ref: "Categoria", required: true },
    valor: { type: Number, required: true },
    plano: { type: String, required: true },
    metodoPagamento: { type: String, required: true },
    frequencia: { type: String, required: true },
    dataAssinatura: { type: String, required: true },
    dataVencimento: { type: String, required: true },
    notificacao: { type: String, required: true },
    linkCancelamento: { type: String, default: "" }
});

module.exports = mongooose.model('Assinatura', assinaturaSchema);