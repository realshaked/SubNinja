import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectAssinaturaPorId } from "./assinaturaSlice";

export default function AssinaturaCard({ id }) {
  const assinatura = useSelector((state) => selectAssinaturaPorId(state, id));

  if (!assinatura) {
    return <div>Assinatura não encontrada</div>;
  }

  const { nome, tipo, categoria, valor, dataVencimento, frequencia, plano } =
    assinatura;

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
                <span className="badge bg-primary">{tipo}</span>
                {categoria && (
                  <span className="badge bg-secondary">{categoria}</span>
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
              {new Date(dataVencimento).toLocaleDateString()}
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
