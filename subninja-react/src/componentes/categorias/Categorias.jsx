import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCategorias,
  addCategoria,
  editCategoria,
  deleteCategoria,
  selectCategoria,
  clearCategoriaSelecionada,
  abrirModal,
  fecharModal,
} from "./categoriasSlice";
import CategoriaTabela from "./CategoriaTabela";
import NovaCategoria from "./NovaCategoria";
import EditarCategoria from "./EditarCategoria";
import ExcluirCategoria from "./ExcluirCategoria";

const Categorias = () => {
  const categorias = useSelector((state) => state.categorias.categorias);
  const status = useSelector((state) => state.categorias.status);
  const error = useSelector((state) => state.categorias.error);
  const categoriaSelecionada = useSelector((state) => state.categorias.categoriaSelecionada);
  const modais = useSelector((state) => state.categorias.modais);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategorias());
    }
  }, [status, dispatch]);

  const handleAddCategoria = (novaCategoria) => {
    dispatch(addCategoria(novaCategoria));
    dispatch(fecharModal('novaCategoria'));
  };

  const handleEditCategoria = (categoriaEditada) => {
    dispatch(editCategoria(categoriaEditada));
    dispatch(fecharModal('editarCategoria'));
    dispatch(clearCategoriaSelecionada());
  };

  const handleDeleteCategoria = () => {
    dispatch(deleteCategoria({ id: categoriaSelecionada.id }));
    dispatch(fecharModal('excluirCategoria'));
    dispatch(clearCategoriaSelecionada());
  };

  if (status === 'loading') {
    return <p>Carregando categorias...</p>;
  }

  if (status === 'failed') {
    return <p>Erro: {error}</p>;
  }

  return (
    <div className="container py-4">
      <CategoriaTabela
        categorias={categorias}
        onEdit={(categoria) => {
          dispatch(selectCategoria(categoria));
          dispatch(abrirModal('editarCategoria'));
        }}
        onDelete={(categoria) => {
          dispatch(selectCategoria(categoria));
          dispatch(abrirModal('excluirCategoria'));
        }}
        onNovaCategoria={() => dispatch(abrirModal('novaCategoria'))}
      />

      <NovaCategoria
        show={modais.novaCategoria}
        onHide={() => dispatch(fecharModal('novaCategoria'))}
        onSalvar={handleAddCategoria}
      />

      <EditarCategoria
        show={modais.editarCategoria}
        onHide={() => {
          dispatch(fecharModal('editarCategoria'));
          dispatch(clearCategoriaSelecionada());
        }}
        onSubmit={handleEditCategoria}
        categoria={categoriaSelecionada}
      />

      <ExcluirCategoria
        show={modais.excluirCategoria}
        onHide={() => {
          dispatch(fecharModal('excluirCategoria'));
          dispatch(clearCategoriaSelecionada());
        }}
        onConfirm={handleDeleteCategoria}
        categoria={categoriaSelecionada}
      />
    </div>
  );
};

export default Categorias;