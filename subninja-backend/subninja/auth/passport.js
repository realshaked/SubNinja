const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Usuario = require('../models/usuarios');
const JWT_SECRET = 'subninja-segredo';

// Estratégia Local (login)
passport.use(new LocalStrategy(
  { usernameField: 'username', passwordField: 'senha' },
  async (username, senha, done) => {
    try {
      const user = await Usuario.findOne({ username });
      if (!user || !user.validarSenha(senha)) return done(null, false);
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

// Estratégia JWT
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};
passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    const user = await Usuario.findById(jwt_payload.id);
    if (user) return done(null, user);
    return done(null, false);
  } catch (err) {
    return done(err, false);
  }
}));

module.exports = passport;