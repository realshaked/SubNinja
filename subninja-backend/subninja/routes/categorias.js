var express = require('express');
var router = express.Router();
const Categoria = require('../models/categorias');

// GET todas
router.get("/", (req, res, next) => {
  Categoria.find()
    .then(categorias => res.json(categorias))
    .catch(err => next(err));
});

// POST nova
router.post("/", (req, res, next) => {
  Categoria.create(req.body)
    .then(categoria => res.status(201).json(categoria))
    .catch(err => next(err));
});

// PUT editar
router.put("/:id", (req, res, next) => {
  Categoria.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(categoria => {
      if (!categoria) return res.status(404).json({ error: "Categoria não encontrada" });
      res.json(categoria);
    })
    .catch(err => next(err));
});

// DELETE
router.delete("/:id", (req, res, next) => {
  Categoria.findByIdAndDelete(req.params.id)
    .then(categoria => {
      if (!categoria) return res.status(404).json({ error: "Categoria não encontrada" });
      res.status(204).end();
    })
    .catch(err => next(err));
});

module.exports = router;