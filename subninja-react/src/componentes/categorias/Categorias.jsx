import React, { useState } from 'react';
import CategoriaTabela from './CategoriaTabela';
import NovaCategoria from './NovaCategoria';
import EditarCategoria from './EditarCategoria';
import ExcluirCategoria from './ExcluirCategoria';
import { FaFilm, FaGamepad, FaMusic, FaCode, FaQuestion, FaSchool, FaHeart, FaHospitalAlt } from 'react-icons/fa';

const Categorias = () => {
  const [categorias, setCategorias] = useState([
    { nome: 'Streaming', cor: '#4361ee', icone: 'Streaming' },
    { nome: 'Software', cor: '#4cc9f0', icone: 'Software' },
    { nome: 'Jogos', cor: '#7209b7', icone: 'Jogos' },
    { nome: 'Música', cor: '#f72585', icone: 'Música' },
    { nome: 'Educação', cor: '#00BFFF', icone: 'Educação' },
    { nome: 'Saúde', cor: '#32CD32', icone: 'Saúde' },
    { nome: 'Família', cor: '#FFD700', icone: 'Família' },
  ]);

  const [modalNovaAberto, setModalNovaAberto] = useState(false);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [modalExcluirAberto, setModalExcluirAberto] = useState(false);

  const [nomeCategoria, setNomeCategoria] = useState('');
  const [corCategoria, setCorCategoria] = useState('#000000');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

  const [nomeNova, setNomeNova] = useState('');
  const [corNova, setCorNova] = useState('#000000');
  const [iconeNova, setIconeNova] = useState('Outro');

  // Nova Categoria
  const handleAddCategoria = (e) => {
    e.preventDefault();
    setCategorias([...categorias, { nome: nomeNova, cor: corNova, icone: iconeNova }]);
    setModalNovaAberto(false);
    setNomeNova('');
    setCorNova('#000000');
    setIconeNova('Outro');
  };

  // Editar Categoria
  const handleEditCategoria = (e) => {
    e.preventDefault();
    if (!categoriaSelecionada) return;

    const editada = {
      ...categoriaSelecionada,
      nome: nomeCategoria,
      cor: corCategoria,
    };

    setCategorias(categorias.map(cat =>
      cat.nome === categoriaSelecionada.nome ? editada : cat
    ));
    setModalEditarAberto(false);
  };

  // Excluir Categoria
  const handleDeleteCategoria = () => {
    if (!categoriaSelecionada) return;
    setCategorias(categorias.filter(cat => cat.nome !== categoriaSelecionada.nome));
    setModalExcluirAberto(false);
  };

  return (
    <div className="container py-4">
      <CategoriaTabela
        categorias={categorias}
        onEdit={(categoria) => {
          setCategoriaSelecionada(categoria);
          setNomeCategoria(categoria.nome);
          setCorCategoria(categoria.cor);
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

      <NovaCategoria
        show={modalNovaAberto}
        onHide={() => setModalNovaAberto(false)}
        nome={nomeNova}
        cor={corNova}
        icone={iconeNova}
        setNome={setNomeNova}
        setCor={setCorNova}
        setIcone={setIconeNova}
        onSalvar={handleAddCategoria}
      />

      <EditarCategoria
        show={modalEditarAberto}
        onHide={() => setModalEditarAberto(false)}
        onSubmit={handleEditCategoria}
        nome={nomeCategoria}
        cor={corCategoria}
        setNome={setNomeCategoria}
        setCor={setCorCategoria}
      />

      <ExcluirCategoria
        show={modalExcluirAberto}
        onHide={() => setModalExcluirAberto(false)}
        onConfirm={handleDeleteCategoria}
        nome={categoriaSelecionada?.nome}
        cor={categoriaSelecionada?.cor} // Passando a cor aqui
      />
    </div>
  );
};

export default Categorias;
