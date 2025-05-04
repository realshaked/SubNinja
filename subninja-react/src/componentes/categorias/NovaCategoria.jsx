import React from 'react';

const NovaCategoria = ({ nome, cor, onChangeNome, onChangeCor, onSave }) => {
  return (
    <div className="modal fade" id="novaCategoriaModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
        <form id="formCategoria" onSubmit={onSave} className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Nova Categoria</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="categoriaNome" className="form-label">Nome da Categoria</label>
              <input
                type="text"
                className="form-control"
                id="categoriaNome"
                value={nome}
                onChange={(e) => onChangeNome(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="categoriaCor" className="form-label">Cor</label>
              <div className="d-flex align-items-center">
                <input
                  type="color"
                  className="form-control form-control-color"
                  id="categoriaCor"
                  value={cor}
                  onChange={(e) => onChangeCor(e.target.value)}
                  title="Escolha uma cor"
                />
                <span className="ms-3">Selecione uma cor para a categoria</span>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="submit" className="btn btn-primary">Salvar Categoria</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NovaCategoria;
