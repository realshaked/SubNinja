import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCategorias,
  addCategoria,
  editCategoria,
  deleteCategoria,
  selectCategoria,
  clearCategoriaSelecionada,
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
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategorias());
    }
  }, [status, dispatch]);

  const [modalNovaAberto, setModalNovaAberto] = useState(false);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [modalExcluirAberto, setModalExcluirAberto] = useState(false);

  const handleAddCategoria = (novaCategoria) => {
    dispatch(addCategoria(novaCategoria));
    setModalNovaAberto(false);
  };

  const handleEditCategoria = (categoriaEditada) => {
    dispatch(editCategoria(categoriaEditada));
    setModalEditarAberto(false);
    dispatch(clearCategoriaSelecionada());
  };

  const handleDeleteCategoria = () => {
    dispatch(deleteCategoria({ id: categoriaSelecionada.id }));
    setModalExcluirAberto(false);
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
          setModalEditarAberto(true);
        }}
        onDelete={(categoria) => {
          dispatch(selectCategoria(categoria));
          setModalExcluirAberto(true);
        }}
        onNovaCategoria={() => setModalNovaAberto(true)}
      />

      <NovaCategoria
        show={modalNovaAberto}
        onHide={() => setModalNovaAberto(false)}
        onSalvar={handleAddCategoria}
      />

      <EditarCategoria
        show={modalEditarAberto}
        onHide={() => {
          setModalEditarAberto(false);
          dispatch(clearCategoriaSelecionada());
        }}
        onSubmit={handleEditCategoria}
        categoria={categoriaSelecionada}
      />

      <ExcluirCategoria
        show={modalExcluirAberto}
        onHide={() => {
          setModalExcluirAberto(false);
          dispatch(clearCategoriaSelecionada());
        }}
        onConfirm={handleDeleteCategoria}
        categoria={categoriaSelecionada}
      />
    </div>
  );
};

export default Categorias;