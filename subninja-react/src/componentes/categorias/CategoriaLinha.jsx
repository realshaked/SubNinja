import React from "react";
import icones from "../../icones";

const CategoriaLinha = ({ categoria, onEdit, onDelete }) => {
  const Icone = icones[categoria.icone] || icones.FaQuestion; // Obtém o componente do ícone

  return (
    <tr>
      <td>
        <Icone /> {/* Renderiza o ícone como um componente React */}
      </td>
      <td>
        <span
          style={{
            backgroundColor: categoria.cor,
            color: "#fff",
            padding: "0.3em 0.6em",
            borderRadius: "0.5em",
            fontWeight: "bold",
          }}
        >
          {categoria.nome}
        </span>
      </td>
      <td>
        <button className="btn btn-warning btn-sm me-2" onClick={onEdit}>
          Editar
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Excluir
        </button>
      </td>
    </tr>
  );
};

export default CategoriaLinha;