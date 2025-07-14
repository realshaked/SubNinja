import React from "react";
import CategoriaLinha from "./CategoriaLinha";

const CategoriaTabela = ({ categorias, onEdit, onDelete, onNovaCategoria }) => {
  return (
    <div>
   

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
              key={cat._id}
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