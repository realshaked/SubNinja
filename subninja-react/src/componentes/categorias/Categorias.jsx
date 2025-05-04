import React, { useState } from 'react';
import Sidebar from '../../componentes/Sidebar';
import Header from '../../componentes/Header';
import CategoriaTabela from './CategoriaTabela';
import NovaCategoria from './NovaCategoria';
import EditarCategoria from './EditarCategoria';
import ExcluirCategoria from './ExcluirCategoria';

const Categorias = () => {
  const [categorias, setCategorias] = useState([
    { nome: 'Streaming', cor: '#4361ee', imagem: '' },
    { nome: 'Software', cor: '#4cc9f0', imagem: ''  },
    { nome: 'Jogos', cor: '#7209b7', imagem: ''  },
    { nome: 'Música', cor: '#f72585', imagem: ''  },
  ]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalNovaAberto, setModalNovaAberto] = useState(false);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [modalExcluirAberto, setModalExcluirAberto] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

  const handleAddCategoria = (novaCategoria) => {
    setCategorias([...categorias, novaCategoria]);
  };

  const handleEditCategoria = (editada) => {
    setCategorias(categorias.map(cat => cat.nome === editada.nome ? editada : cat));
  };

  const handleDeleteCategoria = (nome) => {
    setCategorias(categorias.filter(cat => cat.nome !== nome));
  };

  return (
    <div className="container py-4">
      {sidebarOpen && <Sidebar onClose={() => setSidebarOpen(false)} />}
      <Header onMenuClick={() => setSidebarOpen(true)} />

      <CategoriaTabela
        categorias={categorias}
        onEdit={(categoria) => {
          setCategoriaSelecionada(categoria);
          setModalEditarAberto(true);
        }}
        onDelete={(categoria) => {
          setCategoriaSelecionada(categoria);
          setModalExcluirAberto(true);
        }}
        onNovaCategoria={() => {
          setModalNovaAberto(true);
        }}
      />

      {/* Modais aqui */}
      <NovaCategoria
        open={modalNovaAberto}
        onClose={() => setModalNovaAberto(false)}
        onSalvar={handleAddCategoria}
      />

      <EditarCategoria
      open={modalEditarAberto}
      categoria={categoriaSelecionada}
      onClose={() => setModalEditarAberto(false)}
      onSalvar={handleEditCategoria}
      />

      <ExcluirCategoria
      open={modalExcluirAberto}
      categoria={categoriaSelecionada}
      onClose={() => setModalExcluirAberto(false)}
      onSalvar={handleDeleteCategoria}
      />

    </div>
  );
};

export default Categorias;
