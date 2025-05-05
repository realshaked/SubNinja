import React from "react";
import CategoriaLinha from "./CategoriaLinha";

const CategoriaTabela = ({ categorias, onEdit, onDelete, onNovaCategoria }) => {
  return (
    <div>
      <button className="btn btn-primary mb-3" onClick={onNovaCategoria}>
        Nova Categoria
      </button>

      <table className="table">
        <thead>
          <tr>
            <th>Ícone</th>
            <th>Cor / Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((cat) => (
            <CategoriaLinha
              key={cat.nome}
              categoria={cat}
              onEdit={() => onEdit(cat)}
              onDelete={() => onDelete(cat)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriaTabela;
