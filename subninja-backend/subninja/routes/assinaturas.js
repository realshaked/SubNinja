var express = require('express');
var router = express.Router();
const Assinaturas = require('../models/assinaturas');

/* 
Assinaturas em memória (para testes)
let assinaturas = [
  {id: 1, nome: 'Assinatura Básica', categoriaId:"1", valor:10, plano: "premium", metodoPagamento: "cartao", frequencia: "mensal", dataAssinatura:"10/06/2025", dataVencimento: "10/07/2025", notificacao: "sms" },
]; */

// GET assinatura por id
router.get("/:id", (req, res, next) => {
  Assinaturas.findById(req.params.id)
    .then(assinatura => {
      if (!assinatura) {
        return res.status(404).json({ error: "Assinatura não encontrada" });
      }
      res.json(assinatura);
    })
    .catch(err => next(err));
});

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
router.post("/", async (req, res, next) => {
  try {
    const assinatura = new Assinaturas(req.body);
    await assinatura.validate();
    await assinatura.save();
    res.status(201).json(assinatura);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  }
});

// PUT editar
router.put("/:id", async (req, res, next) => {
  try {
    const assinatura = await Assinaturas.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!assinatura) {
      return res.status(404).json({ error: "Assinatura não encontrada" });
    }
    res.json(assinatura);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  }
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