const express = require('express');
const router = express.Router();
const Notificacao = require('../models/notificacao');

// GET todas
router.get('/', async (req, res, next) => {
  try {
    const notificacoes = await Notificacao.find().sort({ data: -1 });
    res.json(notificacoes);
  } catch (err) {
    next(err);
  }
});

// GET por id
router.get('/:id', async (req, res, next) => {
  try {
    const notificacao = await Notificacao.findById(req.params.id);
    if (!notificacao) return res.status(404).json({ error: 'Notificação não encontrada' });
    res.json(notificacao);
  } catch (err) {
    next(err);
  }
});

// POST nova
router.post('/', async (req, res, next) => {
  try {
    const notificacao = new Notificacao(req.body);
    await notificacao.validate();
    await notificacao.save();
    res.status(201).json(notificacao);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  }
});

// PUT editar
router.put('/:id', async (req, res, next) => {
  try {
    const notificacao = await Notificacao.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!notificacao) return res.status(404).json({ error: 'Notificação não encontrada' });
    res.json(notificacao);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  }
});

// DELETE
router.delete('/:id', async (req, res, next) => {
  try {
    const notificacao = await Notificacao.findByIdAndDelete(req.params.id);
    if (!notificacao) return res.status(404).json({ error: 'Notificação não encontrada' });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;