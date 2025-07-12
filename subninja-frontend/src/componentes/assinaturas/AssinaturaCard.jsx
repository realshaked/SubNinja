import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectAssinaturaPorId } from "./assinaturaSlice";
import { selectAllCategorias } from "../categorias/categoriasSlice";
import {
  formatarDataParaInput,
  formatarMoeda,
  formatarFrequencia,
} from "../../utils/formatadores.js";

export default function AssinaturaCard({ id }) {
  const assinatura = useSelector((state) => selectAssinaturaPorId(state, id));
  const categorias = useSelector(selectAllCategorias);

  if (!assinatura) {
    return <div className="alert alert-warning">Assinatura não encontrada</div>;
  }

  const { nome, categoriaId, valor, dataVencimento, frequencia, plano } =
    assinatura;
  const categoria = categorias.find(
    (cat) => String(cat._id) === String(categoriaId)
  );

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
            <div className="flex-grow-1">
              <Card.Title className="mb-1">{nome}</Card.Title>
              <div className="d-flex gap-2 mt-2">
                {categoria ? (
                  <span
                    className="badge"
                    style={{
                      backgroundColor: categoria.cor,
                      color: "#fff",
                      fontWeight: "normal",
                    }}
                  >
                    {categoria.nome}
                  </span>
                ) : (
                  <span className="badge bg-secondary">Sem categoria</span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-3">
            <p className="mb-1">
              <strong>Valor:</strong> {formatarMoeda(valor)} (
              {formatarFrequencia(frequencia)})
            </p>
            <p className="mb-1">
              <strong>Próximo vencimento:</strong>{" "}
              {formatarDataParaInput(dataVencimento)}
            </p>
            {plano && (
              <p className="mb-1">
                <strong>Plano:</strong> {plano}
              </p>
            )}
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
}
