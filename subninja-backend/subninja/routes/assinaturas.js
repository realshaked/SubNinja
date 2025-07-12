var express = require('express');
var router = express.Router();
const passport = require('passport');
const AssinaturaService = require('../services/assinaturaService');

router.use(passport.authenticate('jwt', { session: false }));

// Middleware para criar instância do serviço
router.use((req, res, next) => {
  res.locals.assinaturaService = new AssinaturaService(req.user._id);
  next();
});

// GET assinatura por id (só do usuário autenticado)
router.get("/:id", async (req, res, next) => {
  try {
    const assinatura = await res.locals.assinaturaService.getAssinaturaById(req.params.id);
    res.json(assinatura);
  } catch (err) {
    if (err.message === 'Assinatura não encontrada') {
      return res.status(404).json({ error: err.message });
    }
    next(err);
  }
});

// GET todas (só do usuário autenticado)
router.get("/", async (req, res, next) => {
  try {
    const assinaturas = await res.locals.assinaturaService.getAllAssinaturas();
    res.status(200).json(assinaturas);
  } catch (err) {
    next(err);
  }
});

// POST nova (vincula ao usuário autenticado e cria notificação)
router.post("/", async (req, res, next) => {
  try {
    const result = await res.locals.assinaturaService.createAssinatura(req.body);
    res.status(201).json(result);
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
    const assinatura = await res.locals.assinaturaService.updateAssinatura(req.params.id, req.body);
    res.json(assinatura);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    if (err.message === 'Assinatura não encontrada') {
      return res.status(404).json({ error: err.message });
    }
    next(err);
  }
});

// DELETE (só se for do usuário autenticado)
router.delete("/:id", async (req, res, next) => {
  try {
    await res.locals.assinaturaService.deleteAssinatura(req.params.id);
    res.status(204).end();
  } catch (err) {
    if (err.message === 'Assinatura não encontrada') {
      return res.status(404).json({ error: err.message });
    }
    next(err);
  }
});

module.exports = router;