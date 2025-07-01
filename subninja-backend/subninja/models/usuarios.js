const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefone:{ type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
});

usuarioSchema.methods.validarSenha = function(senha) {
  return bcrypt.compareSync(senha, this.senha);
};

module.exports = mongoose.model('Usuario', usuarioSchema);