const mongoose = require('mongoose');
const Categoria = require('./models/categorias');
const Usuario = require('./models/usuarios');
const Assinatura = require('./models/assinaturas');
const bcrypt = require('bcryptjs');

const connectionString = 'mongodb://localhost:27017/subninja';

async function seed() {
  await mongoose.connect(connectionString);

  await Categoria.deleteMany({});
  await Usuario.deleteMany({});
  await Assinatura.deleteMany({});

  const categorias = await Categoria.insertMany([
    { nome: "Streaming", cor: "#1976d2", icone: "tv" },
    { nome: "Educação", cor: "#388e3c", icone: "book" },
    { nome: "Música", cor: "#d32f2f", icone: "music" }
  ]);

  const user = await Usuario.create({
    username: "demo",
    senha: bcrypt.hashSync("123456", 10),
    email: "demo@teste.com",
    telefone: "11999999999",
    role: "user"
  });

  const admin = await Usuario.create({
  username: "admin",
  senha: bcrypt.hashSync("admin123", 10),
  email: "admin@teste.com",
  telefone: "11988888888",
  role: "admin"
});

  await Assinatura.create({
    userId: user._id,
    nome: "Netflix",
    categoriaId: categorias[0]._id,
    valor: 39.90,
    plano: "Premium",
    metodoPagamento: "Cartão de Crédito",
    frequencia: "Mensal",
    dataAssinatura: "2024-01-01",
    dataVencimento: "2024-07-01",
    notificacao: "Sim",
    linkCancelamento: ""
  });

  console.log("Seed concluído!");
  mongoose.disconnect();
}

seed();