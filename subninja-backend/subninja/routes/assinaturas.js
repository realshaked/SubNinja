var express = require('express');
var router = express.Router();
const Assinaturas = require('../models/assinaturas');
const mongoose = require('mongoose');
const passport = require('passport');

router.use(passport.authenticate('jwt', { session: false }));

// GET assinatura por id (só do usuário autenticado)
router.get("/:id", (req, res, next) => {
  Assinaturas.findOne({ _id: req.params.id, userId: req.user._id })
    .then(assinatura => {
      if (!assinatura) {
        return res.status(404).json({ error: "Assinatura não encontrada" });
      }
      res.json(assinatura);
    })
    .catch(err => next(err));
});

// GET todas (só do usuário autenticado)
router.get("/", (req, res, next) => {
  Assinaturas.find({ userId: req.user._id })
    .then(assinaturasBanco => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(assinaturasBanco);
    })
    .catch(err => next(err));
});

// POST nova (vincula ao usuário autenticado)
router.post("/", async (req, res, next) => {
  try {
    const assinatura = new Assinaturas({
      ...req.body,
      userId: req.user._id
    });
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

// PUT editar (só se for do usuário autenticado)
router.put("/:id", async (req, res, next) => {
  try {
    const assinatura = await Assinaturas.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
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

// DELETE (só se for do usuário autenticado)
router.delete("/:id", (req, res, next) => {
  Assinaturas.findOneAndDelete({ _id: req.params.id, userId: req.user._id })
    .then(assinatura => {
      if (!assinatura) {
        return res.status(404).json({ error: "Assinatura não encontrada" });
      }
      res.status(204).end();
    })
    .catch(err => next(err));
});

module.exports = router;