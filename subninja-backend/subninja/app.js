var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var assinaturasRouter = require('./routes/assinaturas');
var categoriasRouter = require('./routes/categorias');

const mongoose = require('mongoose');
const connectionString = 'mongodb://localhost:27017/subninja';
const connect = mongoose.connect(connectionString)

connect.then((db) => {
  console.log("Conectado ao MongoDB com sucesso!");
}, (err) => {
  console.log("Erro ao conectar ao MongoDB: ", err);
});

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/assinaturas', assinaturasRouter);
app.use('/categorias', categoriasRouter);

module.exports = app;
