const express = require('express');
const passport = require('../auth/passport');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarios');
const router = express.Router();
const JWT_SECRET = 'subninja-segredo'; // Use variável de ambiente em produção!

// Rota de login JWT (NÃO protegida)
router.post('/login-jwt', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );
    res.json({ token });
  })(req, res, next);
});

module.exports = router;