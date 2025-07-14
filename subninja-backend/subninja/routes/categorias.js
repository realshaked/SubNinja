const express = require('express');
const router = express.Router();
const Assinaturas = require('../models/assinaturas');
const passport = require('../auth/passport');
const isAdmin = require('../auth/isAdmin');
const categoriaService = require('../services/categoriaService');

// Protege todas as rotas abaixo com JWT
router.use(passport.authenticate('jwt', { session: false }));

// GET todas
router.get("/", async (req, res, next) => {
  try{
    const usuarioId = req.user._id;
    const categorias = await categoriaService.getCategoriasDisponiveis(usuarioId);
    res.json(categorias);
  }
  catch(error) {
    res.status(500).json({ error: error.message });
  }
  /* Categoria.find()
    .then(categorias => res.json(categorias))
    .catch(err => next(err)); */
});



//Criar categoria de usuário
router.post("/", async (req, res, next) => {
  try {
    const usuarioId = req.user._id;
    const categoria = await categoriaService.criarCategoriaUsuario(usuarioId, req.body);
    res.status(201).json(categoria);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }  
  /* try {
    const categoria = new Categoria(req.body);
    await categoria.validate();
    await categoria.save();
    res.status(201).json(categoria);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  } */
});
// Criar categoria padrão (apenas admin)
router.post('/padrao', async (req, res) => {
  try {
    // Verificar se é admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Apenas administradores podem criar categorias padrão' });
    }
    
    const categoria = await CategoriaService.criarCategoriaPadrao(req.body);
    res.status(201).json(categoria);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// PUT editar categoria usuário
router.put("/:id", async (req, res, next) => {
  try {
    const usuarioId = req.user._id;
    const categoria = await categoriaService.atualizarCategoriaUsuario(req.params.id, usuarioId, req.body);
    res.json(categoria);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  /* try {
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
  } */
});

// PUT editar categoria padrão (apenas admin)
router.put("/padrao/:id", isAdmin, async (req, res) => {
  try {
    const categoriaAtualizada = await CategoriaService.atualizarCategoriaPadrao(
      req.params.id,
      req.body
    );
    res.json(categoriaAtualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE categoria de usuário
router.delete("/:id", async (req, res, next) => {
  try {
    const usuarioId = req.user._id;
    const categoria = await categoriaService.excluirCategoriaUsuario(req.params.id, usuarioId);
    if (!categoria) {
      return res.status(404).json({ error: "Categoria não encontrada ou você não tem permissão para excluí-la" });
    }
    // Atualiza assinaturas que usam essa categoria
    await Assinaturas.updateMany(
      { categoriaId: req.params.id },
      { $set: { categoriaId: null } }
    );
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE categoria padrão (apenas admin)
router.delete("/padrao/:id", isAdmin, async (req, res, next) => {
  try {
    const categoria = await CategoriaService.desativarCategoriaPadrao(req.params.id);

    //atualizar assinaturas que usam essa categoria
    await Assinaturas.updateMany(
      { categoriaId: req.params.id },
      { $set: { categoriaId: null } }
    );

    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  /* try {
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
  } */
});

module.exports = router;