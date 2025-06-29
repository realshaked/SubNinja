import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import EditarAssinatura from "./EditarAssinatura";
import ExcluirAssinatura from "./ExcluirAssinatura";
import { useSelector } from "react-redux";
import { selectAllCategorias } from "../categorias/categoriasSlice";
import { selectAssinaturaPorId } from "./assinaturaSlice";

const DetalhesAssinatura = () => {
  const location = useLocation();
  const { id } = useParams();
  // Busca assinatura do Redux se não vier pelo state (garante F5 funcionar)
  const assinatura =
    location.state ||
    useSelector((state) => selectAssinaturaPorId(state, id));
  const [showEditarModal, setShowEditarModal] = useState(false);
  const [showExcluirModal, setShowExcluirModal] = useState(false);
  const navigate = useNavigate();
  const categorias = useSelector(selectAllCategorias);
  const categoria = categorias.find(
    (cat) => String(cat._id) === String(assinatura?.categoriaId)
  );

  const formatarDataDDMMYYYY = (data) => {
    if (!data) return "-";
    const dataObj = new Date(data);
    const dia = String(dataObj.getDate()).padStart(2, "0");
    const mes = String(dataObj.getMonth() + 1).padStart(2, "0");
    const ano = dataObj.getFullYear();
    return `${dia}-${mes}-${ano}`;
  };

  if (!assinatura) {
    return (
      <div className="alert alert-warning mt-3">
        Assinatura não encontrada.{" "}
        <button className="btn btn-link p-0" onClick={() => navigate(-1)}>
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="d-flex align-items-start mb-4">
            <div className="subscription-icon-lg me-3">
              <i
                className={`bi bi-${
                  assinatura.icone || "credit-card"
                } text-primary fs-1`}
              ></i>
            </div>
            <div>
              <h2>{assinatura.nome}</h2>
              <div className="d-flex gap-2 mb-2">
                <span className="badge bg-primary">{assinatura.plano}</span>
                {categoria ? (
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
                ) : (
                  <span className="badge bg-secondary">Sem categoria</span>
                )}
              </div>
              <p className="text-muted">{assinatura.frequencia}</p>
            </div>
          </div>

          <div className="details-grid">
            <div className="detail-item">
              <i className="bi bi-currency-dollar"></i>
              <div>
                <small className="text-muted">Valor</small>
                <p>R$ {Number(assinatura.valor).toFixed(2)}</p>
              </div>
            </div>

            <div className="detail-item">
              <i className="bi bi-calendar"></i>
              <div>
                <small className="text-muted">Próximo vencimento</small>
                <p>{formatarDataDDMMYYYY(assinatura.dataVencimento)}</p>
              </div>
            </div>

            <div className="detail-item">
              <i className="bi bi-credit-card"></i>
              <div>
                <small className="text-muted">Método de pagamento</small>
                <p>{assinatura.metodoPagamento}</p>
              </div>
            </div>

            {assinatura.notificacao && (
              <div className="detail-item">
                <i className="bi bi-bell"></i>
                <div>
                  <small className="text-muted">Notificação</small>
                  <p>{assinatura.notificacao}</p>
                </div>
              </div>
            )}

            {assinatura.linkCancelamento && (
              <div className="mt-3">
                <a
                  href={assinatura.linkCancelamento}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-danger"
                >
                  Cancelar Assinatura
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="d-grid gap-2 mb-4">
        <button
          className="btn btn-primary"
          onClick={() => setShowEditarModal(true)}
        >
          <i className="bi bi-pencil me-2"></i>Editar Assinatura
        </button>
        <button
          className="btn btn-outline-danger"
          onClick={() => setShowExcluirModal(true)}
        >
          <i className="bi bi-trash me-2"></i>Excluir Assinatura
        </button>
      </div>

      <EditarAssinatura
        show={showEditarModal}
        onHide={() => setShowEditarModal(false)}
        assinatura={assinatura}
      />

      <ExcluirAssinatura
        show={showExcluirModal}
        onHide={() => setShowExcluirModal(false)}
        assinatura={assinatura}
        onConfirm={() => {
          setShowExcluirModal(false);
          navigate("/assinaturas");
        }}
      />
    </div>
  );
};

export default DetalhesAssinatura;