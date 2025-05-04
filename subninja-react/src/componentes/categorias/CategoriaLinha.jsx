function CategoriaLinha({ categoria, onEdit, onDelete }) {
  return (
    <tr>
      <td>
        {categoria.imagem ? (
          <img
            src={categoria.imagem}
            alt={categoria.nome}
            style={{
              width: 40,
              height: 40,
              objectFit: 'cover',
              borderRadius: '50%',
              border: '1px solid #ccc',
            }}
          />
        ) : (
          <span style={{ width: 40, height: 40, display: 'inline-block' }}></span>
        )}
      </td>
      <td>
        <span
          className="color-preview"
          style={{
            backgroundColor: categoria.cor,
            display: 'inline-block',
            width: 16,
            height: 16,
            borderRadius: '50%',
            marginRight: 8,
          }}
        ></span>
        {categoria.nome}
      </td>
      <td>
        <button className="btn btn-sm btn-outline-primary me-1" onClick={() => onEdit(categoria)}>
          <i className="bi bi-pencil"></i> Editar
        </button>
        <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(categoria)}>
          <i className="bi bi-trash"></i> Excluir
        </button>
      </td>
    </tr>
  );
}

export default CategoriaLinha;
