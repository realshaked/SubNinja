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
  selectCategoriasFiltradas,
  selectCategoriasPadrao,
  selectCategoriasUsuario,
  toggleFiltro,
} from "./categoriasSlice";
import CategoriaTabela from "./CategoriaTabela";
import NovaCategoria from "./NovaCategoria";
import EditarCategoria from "./EditarCategoria";
import ExcluirCategoria from "./ExcluirCategoria";

const Categorias = () => {
  const categorias = useSelector(selectAllCategorias);
  const categoriasFiltradas = useSelector(selectCategoriasFiltradas);
  const categoriasPadrao = useSelector(selectCategoriasPadrao);
  const categoriasUsuario = useSelector(selectCategoriasUsuario);
  const status = useSelector((state) => state.categorias.status);
  const error = useSelector((state) => state.categorias.error);
  const usuario = useSelector((state) => state.auth.user);
  const filtros = useSelector((state) => state.categorias.filtros);
  const categoriaSelecionada = useSelector(
    (state) => state.categorias.categoriaSelecionada
  );
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
    if (categoriaSelecionada.isPadrao) {
      alert("Não é possível excluir categorias padrão");
      return;
    }

    dispatch(
      deleteCategoria({
        id: categoriaSelecionada._id,
        isPadrao: categoriaSelecionada.isPadrao,
      })
    );
    dispatch(fecharModal("excluirCategoria"));
    dispatch(clearCategoriaSelecionada());
  };

  const handleEdit = (categoria) => {
    if (categoria.isPadrao) {
      alert("Não é possível editar categorias padrão");
      return;
    }

    dispatch(selectCategoria(categoria));
    dispatch(abrirModal("editarCategoria"));
  };

  const handleDelete = (categoria) => {
    if (categoria.isPadrao) {
      alert("Não é possível excluir categorias padrão");
      return;
    }

    if (window.confirm(`Deseja excluir a categoria "${categoria.nome}"?`)) {
      dispatch(selectCategoria(categoria));
      dispatch(abrirModal("excluirCategoria"));
    }
  };

  if (status === "loading") {
    return <p>Carregando categorias...</p>;
  }

  if (status === "failed") {
    return <p className="text-danger">Erro ao carregar categorias: {error}</p>;
  }

  return (
    <div className="container py-4">
      <div className="row mb-4">
        <div className="col">
          <h2
            className="title"
            style={{
              textAlign: "center",
              fontWeight: 600,
              fontSize: "2rem",
              color: "#1976d2",
              letterSpacing: "1px",
              marginBottom: "0.5em",
            }}
          >
            Categorias
          </h2>
          <div
            style={{
              width: "60px",
              height: "4px",
              background: "#1976d2",
              margin: "0 auto 16px auto",
              borderRadius: "2px",
              opacity: 0.2,
            }}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="filtrosPadrao"
              checked={filtros?.mostrarPadrao ?? true}
              onChange={() => dispatch(toggleFiltro("mostrarPadrao"))}
            />
            <label className="form-check-label" htmlFor="filtrosPadrao">
              Mostrar Padrão ({categoriasPadrao.length})
            </label>
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="filtrosUsuario"
              checked={filtros?.mostrarUsuario ?? true}
              onChange={() => dispatch(toggleFiltro("mostrarUsuario"))}
            />
            <label className="form-check-label" htmlFor="filtrosUsuario">
              Mostrar Minhas ({categoriasUsuario.length})
            </label>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <button
            className="btn btn-primary me-2"
            onClick={() => dispatch(abrirModal("novaCategoria"))}
          >
            Nova Categoria
          </button>

          {usuario?.role === "admin" && (
          <button
            className="btn btn-secondary"
            onClick={() => dispatch(abrirModal("novaCategoriaPadrao"))}
          >
            Nova Categoria Padrão
          </button>
          )}
        </div>
      </div>

      <CategoriaTabela
        categorias={categoriasFiltradas}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onNovaCategoria={() => dispatch(abrirModal("novaCategoria"))}
      />

      {/* Modais */}
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
