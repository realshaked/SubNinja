const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'subninjasite@gmail.com', // Exemplo: subninja@gmail.com
    pass: 'eylh devt xuzi mmcs'
  }
});

async function enviarEmail(destinatario, assunto, mensagem) {
  return transporter.sendMail({
    from: '"SubNinja" subninjasite@gmail.com',
    to: destinatario,
    subject: assunto,
    text: mensagem
  });
}

module.exports = { enviarEmail };