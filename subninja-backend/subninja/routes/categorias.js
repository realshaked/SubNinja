var express = require('express');
var router = express.Router();

let categorias = [
  {id: 1, nome: 'Categoria 1', cor:"", icone:"" },
];
// GET todas
router.get("/", (req, res) => {
  res.json(categorias);
});

// POST nova
router.post("/", (req, res) => {
  const nova = { ...req.body, id: Date.now().toString() };
  categorias.push(nova);
  res.status(201).json(nova);
});

// PUT editar
router.put("/:id", (req, res) => {
  const idx = categorias.findIndex(a => a.id == req.params.id);
  if (idx === -1) return res.status(404).json({ error: "categoria não encontrada" });
  categorias[idx] = { ...categorias[idx], ...req.body, id: categorias[idx].id };
  res.json(categorias[idx]);
});

// DELETE
router.delete("/:id", (req, res) => {
  const idx = categorias.findIndex(a => a.id == req.params.id);
  if (idx === -1) return res.status(404).json({ error: "categoria não encontrada" });
  categorias.splice(idx, 1);
  res.status(204).end();
});

module.exports = router;
