const express = require('express');
const passport = require('../auth/passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuarios');
const router = express.Router();
const JWT_SECRET = 'subninja-segredo'; // Use variável de ambiente em produção!

router.post('/register', async (req, res, next) => {
  try {
    const { username, senha, role, email, telefone } = req.body;
    if (!username || !senha || !role || !email || !telefone) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const existe = await Usuario.findOne({ username });
    if (existe) {
      return res.status(400).json({ error: 'Usuário já existe' });
    }

    const hash = bcrypt.hashSync(senha, 10);
    const novoUsuario = new Usuario({ username, senha: hash, role, email, telefone });
    await novoUsuario.save();

    // Gera o token JWT
    const token = jwt.sign(
      { id: novoUsuario._id, username: novoUsuario.username, role: novoUsuario.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Remove a senha do retorno
    const { senha: _, ...userData } = novoUsuario.toObject();

    res.status(201).json({ token, user: userData });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: 'Usuário ou email já existe.' });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: 'Dados inválidos', message: err.message });
    }
    next(err);
  }
});

// Login JWT
router.post('/login-jwt', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: '1d' }
    );
    //retorna os dados do usuario
    const {senha, ...userData} = user.toObject();
    res.json({ token, user: userData });
  })(req, res, next);
});

router.post('/register', async (req, res, next) => {
  try{
    const { username, senha, role, email, telefone } = req.body;
    if (!username || !senha || !role || !email|| !telefone) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }
    
    const existe = await Usuario.findOne({ username });
    if ( existe ) {
      return res.status(400).json({ error: 'Usuário já existe' });
    }

    const novoUsuario = new Usuario({ username, senha, role, email, telefone });
    await novoUsuario.save();
    
    res.status(201).json({ message: 'Usuário criado com sucesso' });
  }
  catch(err){
    console.error(err);
    
    if(err.code === 11000) {
      return res.status(409).json({ error: 'Usuário já existe',
        message: 'O nome de usuário já está em uso. Por favor, escolha outro.' 
      });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).json({ 
        error: 'Dados inválidos',
        message: err.message
      });
    }
    next(err);
  }
})

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao fazer logout' });
    }
    res.json({ message: 'Logout realizado com sucesso' });
  });
});


module.exports = router;