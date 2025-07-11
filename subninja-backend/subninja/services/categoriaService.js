// services/CategoriaService.js
const CategoriasPadrao = require('../models/categoriasPadrao');
const Categoria = require('../models/categorias');

class CategoriaService {
  
  // Buscar todas as categorias disponíveis para um usuário
  async getCategoriasDisponiveis(usuarioId) {
    const [categoriasPadrao, categoriasUsuario] = await Promise.all([
      CategoriasPadrao.find({ ativa: true }),
      Categoria.find({ usuarioId })
    ]);
    
    return {
      padrao: categoriasPadrao,
      usuario: categoriasUsuario,
      todas: [...categoriasPadrao, ...categoriasUsuario]
    };
  }
  
  // Criar categoria do usuário
  async criarCategoriaUsuario(usuarioId, dadosCategoria) {
    const categoria = new Categoria({
      ...dadosCategoria,
      usuarioId
    });
    
    return await categoria.save();
  }
  
  // Criar categoria padrão (apenas admin)
  async criarCategoriaPadrao(dadosCategoria) {
    const categoria = new CategoriasPadrao(dadosCategoria);
    return await categoria.save();
  }
  
  // Verificar se categoria existe (padrão ou usuário)
  async verificarCategoriaExiste(categoriaId, usuarioId) {
    const categoriaPadrao = await CategoriasPadrao.findById(categoriaId);
    if (categoriaPadrao) return categoriaPadrao;
    
    const categoriaUsuario = await Categoria.findOne({ 
      _id: categoriaId, 
      usuarioId 
    });
    
    return categoriaUsuario;
  }
  // Atualizar categoria do usuário
  async atualizarCategoriaUsuario(categoriaId, usuarioId, dadosAtualizados) {
    const categoria = await Categoria.findOneAndUpdate(
      { _id: categoriaId, usuarioId },
      dadosAtualizados,
      { new: true, runValidators: true }
    );

    if (!categoria) {
      throw new Error('Categoria não encontrada ou você não tem permissão para editá-la');
    }

    return categoria;
  }
  // Atualizar categoria padrão (apenas admin)
  async atualizarCategoriaPadrao(categoriaId, dadosAtualizados) {
    const categoria = await CategoriasPadrao.findByIdAndUpdate(
      categoriaId,
      dadosAtualizados,
      { new: true, runValidators: true }
    );

    if (!categoria) {
      throw new Error('Categoria padrão não encontrada');
    }

    return categoria;
  }
  // Excluir categoria do usuário (soft delete)
  async excluirCategoriaUsuario(categoriaId, usuarioId) {
    const categoria = await Categoria.findOneAndDelete({ 
      _id: categoriaId, 
      usuarioId 
    });

    if (!categoria) {
      throw new Error('Categoria não encontrada ou você não tem permissão para excluí-la');
    }

    return categoria;
  }
  // Excluir/desativar categoria padrão (soft delete - apenas admin)
  async desativarCategoriaPadrao(categoriaId) {
    const categoria = await CategoriasPadrao.findByIdAndUpdate(
      categoriaId,
      { ativa: false },
      { new: true }
    );

    if (!categoria) {
      throw new Error('Categoria padrão não encontrada');
    }

    return categoria;
  }

}



module.exports = new CategoriaService();