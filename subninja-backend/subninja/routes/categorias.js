var express = require('express');
const Assinaturas = require('../models/assinaturas');
var router = express.Router();
const Categoria = require('../models/categorias');

// GET todas
router.get("/", (req, res, next) => {
  Categoria.find()
    .then(categorias => res.json(categorias))
    .catch(err => next(err));
});

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
router.delete("/:id", async (req, res, next) => {
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