import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectAssinaturaPorId } from "./assinaturaSlice";
import { selectAllCategorias } from "../categorias/categoriasSlice";

export default function AssinaturaCard({ id }) {
  const assinatura = useSelector((state) => selectAssinaturaPorId(state, id));
  const categorias = useSelector(selectAllCategorias);

  if (!assinatura) {
    return <div>Assinatura não encontrada</div>;
  }

  const { nome, categoriaId, valor, dataVencimento, frequencia, plano } = assinatura;
  const categoria = categorias.find((cat) => cat.id === categoriaId);

  const formatarDataDDMMYYYY = (data) => {
    const dataObj = new Date(data);
    const dia = String(dataObj.getDate()).padStart(2, "0");
    const mes = String(dataObj.getMonth() + 1).padStart(2, "0");
    const ano = dataObj.getFullYear();
    return `${dia}-${mes}-${ano}`;
  };

  return (
    <Link
      to={`/assinaturas/${id}`}
      state={assinatura}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Card className="mb-3 shadow-sm hover-effect">
        <Card.Body>
          <div className="d-flex align-items-center">
            <div className="me-3">
              <i className="bi bi-card-checklist fs-2 text-primary"></i>
            </div>
            <div>
              <Card.Title className="mb-1">{nome}</Card.Title>
              <div className="d-flex gap-2">
                {categoria && (
                  <span
                    className="badge"
                    style={{
                      backgroundColor: categoria.cor,
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    {categoria.nome}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="mt-3">
            <p className="mb-1">
              <strong>Valor:</strong> R$ {valor.toFixed(2)} ({frequencia})
            </p>
            <p className="mb-1">
              <strong>Próximo vencimento:</strong>{" "}
              {formatarDataDDMMYYYY(dataVencimento)}
            </p>
            <p className="mb-1">
              <strong>Plano:</strong> {plano}
            </p>
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
}