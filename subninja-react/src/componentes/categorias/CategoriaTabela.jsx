import React, { useState } from 'react';
import CustomModal from '../Modal';
import CategoriaLinha from './CategoriaLinha';

const CategoriaTabela = ({ categorias, onEdit, onDelete, onNovaCategoria }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [categoryColor, setCategoryColor] = useState('#000000');
  const [categoryImage, setCategoryImage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleShowModal = (type, categoria = null) => {
    setModalType(type);
    if (categoria) {
      setSelectedCategory(categoria);
      setCategoryName(categoria.nome);
      setCategoryColor(categoria.cor);
      setCategoryImage(categoria.imagem || '');
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCategory(null);
  };

  const handleConfirm = () => {
    if (modalType === 'edit') {
      const editada = {
        nome: categoryName,
        cor: categoryColor,
        imagem: categoryImage
      };
      onEdit(editada);
    } else if (modalType === 'delete') {
      onDelete(selectedCategory);
    }
    setShowModal(false);
  };

  return (
    <div>
      <button className="btn btn-primary mb-3" onClick={onNovaCategoria}>
        Nova Categoria
      </button>

      <table className="table">
        <thead>
          <tr>
            <th>Imagem</th>
            <th>Cor / Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((cat) => (
            <CategoriaLinha
              key={cat.nome}
              categoria={cat}
              onEdit={() => handleShowModal('edit', cat)}
              onDelete={() => handleShowModal('delete', cat)}
            />
          ))}
        </tbody>
      </table>

      {/* Modal de Edição / Exclusão */}
      <CustomModal
        showModal={showModal}
        handleClose={handleCloseModal}
        title={modalType === 'edit' ? 'Editar Categoria' : 'Excluir Categoria'}
        confirmText={modalType === 'edit' ? 'Salvar alterações' : 'Excluir'}
        handleConfirm={handleConfirm}
        body={
          modalType === 'edit' ? (
            <>
              <div className="mb-3">
                <label className="form-label">Nome</label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Cor</label>
                <input
                  type="color"
                  value={categoryColor}
                  onChange={(e) => setCategoryColor(e.target.value)}
                  className="form-control form-control-color"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Imagem (URL ou Upload)</label>
                <input
                  type="text"
                  value={categoryImage}
                  onChange={(e) => setCategoryImage(e.target.value)}
                  className="form-control mb-2"
                  placeholder="Cole uma URL de imagem"
                />
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setCategoryImage(reader.result); // base64
                    };
                    if (file) reader.readAsDataURL(file);
                  }}
                />
                {categoryImage && (
                  <div className="mt-2">
                    <img
                      src={categoryImage}
                      alt="Prévia"
                      style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }}
                    />
                  </div>
                )}
              </div>
            </>
          ) : (
            <p>
              Tem certeza que deseja excluir a categoria <strong>{categoryName}</strong>?
            </p>
          )
        }
      />
    </div>
  );
};

export default CategoriaTabela;
