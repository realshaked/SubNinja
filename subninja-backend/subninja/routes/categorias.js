const express = require('express');
const router = express.Router();
const Categoria = require('../models/categorias');
const Assinaturas = require('../models/assinaturas');
const passport = require('../auth/passport');
const isAdmin = require('../auth/isAdmin');

// GET todas
router.get("/", (req, res, next) => {
  Categoria.find()
    .then(categorias => res.json(categorias))
    .catch(err => next(err));
});

// Protege todas as rotas abaixo com JWT
router.use(passport.authenticate('jwt', { session: false }));

// POST nova
router.post("/", async (req, res, next) => {
  try {
    const categoria = new Categoria(req.body);
    await categoria.validate();
    await categoria.save();
    res.status(201).json(categoria);
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
    const categoria = await Categoria.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!categoria) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }
    res.json(categoria);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  }
});

// DELETE
router.delete("/:id", isAdmin, async (req, res, next) => {
  try {
    const categoria = await Categoria.findByIdAndDelete(req.params.id);
    if (!categoria) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }
    await Assinaturas.updateMany(
      { categoriaId: req.params.id },
      { $set: { categoriaId: null } }
    );
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;