const cron = require('node-cron');
const Notificacao = require('../models/notificacao');
const Assinatura = require('../models/assinaturas');
const { enviarEmail } = require('../services/enviarEmail');

// Função para calcular próxima renovação
function calcularProximaRenovacao(dataBase, frequencia) {
  let data = new Date(dataBase);
  switch (frequencia) {
    case "mensal":
      data.setMonth(data.getMonth() + 1);
      break;
    case "anual":
      data.setFullYear(data.getFullYear() + 1);
      break;
    case "semanal":
      data.setDate(data.getDate() + 7);
      break;
    case "trimestral":
      data.setMonth(data.getMonth() + 3);
      break;
    case "semestral":
      data.setMonth(data.getMonth() + 6);
      break;
    default:
      data.setMonth(data.getMonth() + 1);
  }
  return data;
}

// Roda a cada minuto
cron.schedule('* * * * *', async () => {
  const agora = new Date();
  // Busca notificações ativas, canal email, data <= agora
  const notificacoes = await Notificacao.find({
    canal: "email",
    status: "Ativa",
    data_envio_programada: { $lte: agora }
  });

  for (const notificacao of notificacoes) {
    if (notificacao.email) {
      try {
        // Envia o e-mail
        await enviarEmail(
          notificacao.email,
          notificacao.titulo,
          notificacao.mensagem
        );

        // Busca a assinatura para pegar frequência e data base
        const assinatura = await Assinatura.findById(notificacao.assinaturaId);
        if (!assinatura) continue;

        // Calcula próxima renovação da assinatura
        const proximaRenovacao = calcularProximaRenovacao(
          new Date(notificacao.data_envio_programada.getTime() + Number(notificacao.diasAntes || 1) * 24 * 60 * 60 * 1000),
          assinatura.frequencia
        );

        // Define nova data de envio: próxima renovação - diasAntes
        const novaDataEnvio = new Date(proximaRenovacao);
        novaDataEnvio.setDate(novaDataEnvio.getDate() - Number(notificacao.diasAntes || 1));

        if (notificacao.horaNotificacao) {
          const [h, m] = notificacao.horaNotificacao.split(":");
          novaDataEnvio.setHours(Number(h), Number(m), 0, 0);
        }

        // Atualiza a notificação para o próximo ciclo
        notificacao.data_envio_programada = novaDataEnvio;
        await notificacao.save();

        console.log(`Notificação recorrente enviada para ${notificacao.email}`);
      } catch (err) {
        console.error("Erro ao enviar e-mail:", err);
      }
    }
  }
});