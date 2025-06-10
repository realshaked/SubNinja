var express = require('express');
var router = express.Router();

let assinaturas = [
  {id: 1, nome: 'Assinatura Básica', categoriaId:"1", valor:10, plano: "premium", metodoPagamento: "cartao", frequencia: "mensal", dataAssinatura:"10/06/2025", dataVencimento: "10/07/2025", notificacao: "sms" },
];

// GET todas
router.get("/", (req, res) => {
  res.json(assinaturas);
});

// POST nova
router.post("/", (req, res) => {
  const nova = { ...req.body, id: Date.now().toString() };
  assinaturas.push(nova);
  res.status(201).json(nova);
});

// PUT editar
router.put("/:id", (req, res) => {
  const idx = assinaturas.findIndex(a => a.id == req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Assinatura não encontrada" });
  assinaturas[idx] = { ...assinaturas[idx], ...req.body, id: assinaturas[idx].id };
  res.json(assinaturas[idx]);
});

// DELETE
router.delete("/:id", (req, res) => {
  const idx = assinaturas.findIndex(a => a.id == req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Assinatura não encontrada" });
  assinaturas.splice(idx, 1);
  res.status(204).end();
});

module.exports = router;
