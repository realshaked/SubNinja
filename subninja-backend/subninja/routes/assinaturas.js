var express = require('express');
var router = express.Router();
const Assinaturas = require('../models/assinaturas');

/* 
Assinaturas em memória (para testes)
let assinaturas = [
  {id: 1, nome: 'Assinatura Básica', categoriaId:"1", valor:10, plano: "premium", metodoPagamento: "cartao", frequencia: "mensal", dataAssinatura:"10/06/2025", dataVencimento: "10/07/2025", notificacao: "sms" },
]; */

// GET todas
router.get("/", (req, res, next) => {
  Assinaturas.find()
    .then(assinaturasBanco => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(assinaturasBanco);
    })
    .catch(err => next(err));
});

// POST nova
router.post("/", (req, res, next) => {
  Assinaturas.create(req.body)
    .then(assinatura => {
      res.status(201).json(assinatura);
    })
    .catch(err => next(err));
});

// PUT editar
router.put("/:id", (req, res, next) => {
  Assinaturas.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(assinatura => {
      if (!assinatura) {
        return res.status(404).json({ error: "Assinatura não encontrada" });
      }
      res.json(assinatura);
    })
    .catch(err => next(err));
});

// DELETE
router.delete("/:id", (req, res, next) => {
  Assinaturas.findByIdAndDelete(req.params.id)
    .then(assinatura => {
      if (!assinatura) {
        return res.status(404).json({ error: "Assinatura não encontrada" });
      }
      res.status(204).end();
    })
    .catch(err => next(err));
});

module.exports = router;