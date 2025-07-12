const Assinaturas = require('../models/assinaturas');
const Notificacao = require('../models/notificacao');
const calcularDataVencimento = require('../utils/calcularDataVencimento');
const DIAS_ANTES_NOTIFICACAO = 1; // Ajuste de quantos dias antes da data de vencimento a notificação deve ser enviada

class AssinaturaService {
  constructor(userId) {
    this.userId = userId;
  }

  // GET assinatura por id (só do usuário autenticado)
  async getAssinaturaById(id) {
    const assinatura = await Assinaturas.findOne({ _id: id, userId: this.userId });
    if (!assinatura) {
      throw new Error('Assinatura não encontrada');
    }
    return assinatura;
  }

  // GET todas (só do usuário autenticado)
  async getAllAssinaturas() {
    return await Assinaturas.find({ userId: this.userId });
  }

  // POST nova (vincula ao usuário autenticado e cria notificação)
  async createAssinatura(assinaturaData) {
    // Calcula a data de vencimento automaticamente
    const dataVencimento = calcularDataVencimento(
      assinaturaData.dataAssinatura || new Date(), 
      assinaturaData.frequencia
    );
    
    const assinatura = new Assinaturas({
      ...assinaturaData,
      dataVencimento,
      userId: this.userId
    });

    await assinatura.validate();
    await assinatura.save();

    // Cria notificação para a data da renovação
    const notificacao = new Notificacao({
      titulo: "Renovação de assinatura",
      mensagem: `Sua assinatura de ${assinatura.nome} será renovada amanhã.`,
      data_envio_programada: new Date(dataVencimento.getTime() - (DIAS_ANTES_NOTIFICACAO * 24 * 60 * 60 * 1000)), 
      userId: this.userId 
    });

    await notificacao.validate();
    await notificacao.save();

    return { assinatura, notificacao };
  }

  // PUT editar (só se for do usuário autenticado)
  async updateAssinatura(id, updateData) {
    const assinatura = await Assinaturas.findOneAndUpdate(
      { _id: id, userId: this.userId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!assinatura) {
      throw new Error('Assinatura não encontrada');
    }

    return assinatura;
  }

  // DELETE (só se for do usuário autenticado)
  async deleteAssinatura(id) {
    const assinatura = await Assinaturas.findOneAndDelete({ _id: id, userId: this.userId });
    
    if (!assinatura) {
      throw new Error('Assinatura não encontrada');
    }

    return true;
  }
}

module.exports = AssinaturaService;