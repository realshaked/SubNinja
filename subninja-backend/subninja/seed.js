const mongoose = require('mongoose');
const CategoriasPadrao = require('./models/categoriasPadrao'); // Modelo de categorias padrão
const Categoria = require('./models/categorias'); // Modelo de categorias do usuário
const Usuario = require('./models/usuarios');
const Assinatura = require('./models/assinaturas');
const bcrypt = require('bcryptjs');

const connectionString = 'mongodb://localhost:27017/subninja';

async function seed() {
  try {
    await mongoose.connect(connectionString);
    console.log('Conectado ao MongoDB');

    // Limpar collections existentes
    await CategoriasPadrao.deleteMany({});
    await Categoria.deleteMany({});
    await Usuario.deleteMany({});
    await Assinatura.deleteMany({});
    console.log('Collections limpas');

    // Criar categorias padrão
    const categoriasPadrao = await CategoriasPadrao.insertMany([
      { nome: "Streaming", cor: "#1976d2", icone: "tv", descricao: "Serviços de streaming de vídeo" },
      { nome: "Educação", cor: "#388e3c", icone: "book", descricao: "Plataformas educacionais e cursos" },
      { nome: "Música", cor: "#d32f2f", icone: "music", descricao: "Serviços de streaming de música" },
      { nome: "Armazenamento", cor: "#795548", icone: "cloud", descricao: "Serviços de armazenamento em nuvem" }
    ]);
    console.log('Categorias padrão criadas:', categoriasPadrao.length);

    // Criar usuários
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
    console.log('Usuários criados');

    // Criar algumas categorias personalizadas do usuário
    const categoriaPersonalizada = await Categoria.create({
      nome: "Minha Categoria",
      cor: "#e91e63",
      icone: "star",
      usuarioId: user._id
    });
    console.log('Categoria personalizada criada');

    // Criar assinaturas usando categoria padrão
    const assinaturas = await Assinatura.insertMany([
      {
        usuarioId: user._id,
        nome: "Netflix",
        categoriaId: categoriasPadrao[0]._id, // Streaming
        valor: 39.90,
        plano: "Premium",
        metodoPagamento: "Cartão de Crédito",
        frequencia: "Mensal",
        dataAssinatura: "2024-01-01",
        dataVencimento: "",
        notificacao: "Sim",
        linkCancelamento: ""
      },
      {
        usuarioId: user._id,
        nome: "Spotify",
        categoriaId: categoriasPadrao[2]._id, // Música
        valor: 19.90,
        plano: "Individual",
        metodoPagamento: "PIX",
        frequencia: "Mensal",
        dataAssinatura: "2024-01-15",
        dataVencimento: "2024-07-15",
        notificacao: "Sim",
        linkCancelamento: ""
      },
      {
        usuarioId: user._id,
        nome: "Coursera",
        categoriaId: categoriasPadrao[1]._id, // Educação
        valor: 49.90,
        plano: "Plus",
        metodoPagamento: "Cartão de Crédito",
        frequencia: "Mensal",
        dataAssinatura: "2024-02-01",
        dataVencimento: "2024-08-01",
        notificacao: "Sim",
        linkCancelamento: ""
      },
      {
        usuarioId: user._id,
        nome: "Serviço Personalizado",
        categoriaId: categoriaPersonalizada._id, // Categoria personalizada
        valor: 29.90,
        plano: "Básico",
        metodoPagamento: "Cartão de Débito",
        frequencia: "Mensal",
        dataAssinatura: "2024-03-01",
        dataVencimento: "2024-09-01",
        notificacao: "Não",
        linkCancelamento: ""
      }
    ]);
    console.log('Assinaturas criadas:', assinaturas.length);

    console.log('\n=== SEED CONCLUÍDO COM SUCESSO! ===');
    console.log(`Categorias padrão: ${categoriasPadrao.length}`);
    console.log(`Categorias personalizadas: 1`);
    console.log(`Usuários: 2`);
    console.log(`Assinaturas: ${assinaturas.length}`);
    console.log('\nCredenciais de teste:');
    console.log('Usuário: demo / senha: 123456');
    console.log('Admin: admin / senha: admin123');
    
  } catch (error) {
    console.error('Erro durante o seed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Desconectado do MongoDB');
  }
}

seed();