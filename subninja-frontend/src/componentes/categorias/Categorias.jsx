import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCategorias,
  createCategoria,
  updateCategoria,
  deleteCategoria,
} from "./categoriasThunks";
import {
  selectCategoria,
  clearCategoriaSelecionada,
  abrirModal,
  fecharModal,
  selectAllCategorias,
} from "./categoriasSlice";
import CategoriaTabela from "./CategoriaTabela";
import NovaCategoria from "./NovaCategoria";
import EditarCategoria from "./EditarCategoria";
import ExcluirCategoria from "./ExcluirCategoria";

const Categorias = () => {
  const categorias = useSelector(selectAllCategorias); // Usar o selector do adapter
  const status = useSelector((state) => state.categorias.status);
  const error = useSelector((state) => state.categorias.error);
  const categoriaSelecionada = useSelector((state) => state.categorias.categoriaSelecionada);
  const modais = useSelector((state) => state.categorias.modais);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategorias());
    }
  }, [status, dispatch]);

  const handleCreateCategoria = (novaCategoria) => {
    dispatch(createCategoria(novaCategoria));
    dispatch(fecharModal("novaCategoria"));
  };

  const handleUpdateCategoria = (categoriaEditada) => {
    dispatch(updateCategoria(categoriaEditada));
    dispatch(fecharModal("editarCategoria"));
    dispatch(clearCategoriaSelecionada());
  };

  const handleDeleteCategoria = () => {
    dispatch(deleteCategoria({ id: categoriaSelecionada._id }));
    dispatch(fecharModal("excluirCategoria"));
    dispatch(clearCategoriaSelecionada());
  };

  if (status === "loading") {
    return <p>Carregando categorias...</p>;
  }

  if (status === "failed") {
    return <p className="text-danger">Erro ao carregar categorias: {error}</p>;
  }

  return (
    <div className="container py-4">
      <CategoriaTabela
        categorias={categorias}
        onEdit={(categoria) => {
          dispatch(selectCategoria(categoria));
          dispatch(abrirModal("editarCategoria"));
        }}
        onDelete={(categoria) => {
          dispatch(selectCategoria(categoria));
          dispatch(abrirModal("excluirCategoria"));
        }}
        onNovaCategoria={() => dispatch(abrirModal("novaCategoria"))}
      />

      <NovaCategoria
        show={modais.novaCategoria}
        onHide={() => dispatch(fecharModal("novaCategoria"))}
        onSalvar={handleCreateCategoria}
      />

      <EditarCategoria
        show={modais.editarCategoria}
        onHide={() => {
          dispatch(fecharModal("editarCategoria"));
          dispatch(clearCategoriaSelecionada());
        }}
        onSubmit={handleUpdateCategoria}
        categoria={categoriaSelecionada}
      />

      <ExcluirCategoria
        show={modais.excluirCategoria}
        onHide={() => {
          dispatch(fecharModal("excluirCategoria"));
          dispatch(clearCategoriaSelecionada());
        }}
        onConfirm={handleDeleteCategoria}
        categoria={categoriaSelecionada}
      />
    </div>
  );
};

export default Categorias;