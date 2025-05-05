import React from "react";
import { FaFilm, FaGamepad, FaMusic, FaCode, FaQuestion, FaBook, FaHeartbeat, FaUsers } from "react-icons/fa";

const icones = {
  Streaming: <FaFilm />,
  Jogos: <FaGamepad />,
  Música: <FaMusic />,
  Software: <FaCode />,
  Educação: <FaBook />,
  Saúde: <FaHeartbeat />,
  Família: <FaUsers />,
  Outro: <FaQuestion />,
};

const CategoriaLinha = ({ categoria, onEdit, onDelete }) => {
  return (
    <tr>
      <td>{icones[categoria.icone] || icones['Outro']}</td>
      <td>
        <span
          className="badge"
          style={{
            backgroundColor: categoria.cor,
            color: "#fff",
            padding: "0.5em 1em",
            borderRadius: "0.5em"
          }}
        >
          {categoria.nome}
        </span>
      </td>
      <td>
        <button className="btn btn-sm btn-warning me-2" onClick={onEdit}>
          Editar
        </button>
        <button className="btn btn-sm btn-danger" onClick={onDelete}>
          Excluir
        </button>
      </td>
    </tr>
  );
};

export default CategoriaLinha;
