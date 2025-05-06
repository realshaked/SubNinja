import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const DetalhesAssinatura = () => {
  const location = useLocation();
  const {id} = useParams();
  const assinatura = location.state;

  if (!assinatura) {
    return <p>Assinatura não encontrada.</p>;
  }

  return (
    <>
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="d-flex align-items-start mb-4">
            <div className="subscription-icon-lg me-3">
              <i className="bi bi-play-circle-fill" id="detailIcon"></i>
            </div>
            <div>
              <h2 id="detailName">{assinatura.nome}</h2>
              <span className="badge bg-primary" id="detailCategory">{assinatura.categoria}</span>
            </div>
          </div>

          <div className="details-grid">
            <div className="detail-item">
              <i className="bi bi-currency-dollar"></i>
              <div>
                <small className="text-muted">Valor</small>
                <p id="detailPrice">R$ {assinatura.valor}</p>
              </div>
            </div>

            <div className="detail-item">
              <i className="bi bi-calendar"></i>
              <div>
                <small className="text-muted">Próximo vencimento</small>
                <p id="detailDueDate">{assinatura.dataVencimento}</p>
              </div>
            </div>

            <div className="detail-item">
              <i className="bi bi-credit-card"></i>
              <div>
                <small className="text-muted">Método de pagamento</small>
                <p id="detailPayment">{assinatura.metodoPagamento}</p>
              </div>
            </div>

            <div className="detail-item">
              <i className="bi bi-bell"></i>
              <div>
                <small className="text-muted">Notificação</small>
                <p id="detailNotification">{assinatura.notificacao}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Área de Ações */}
      <div className="d-grid gap-2">
        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editarAssinaturaModal">
          <i className="bi bi-pencil"></i> Editar Assinatura
        </button>
        <button className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#excluirAssinaturaModal">
          <i className="bi bi-trash"></i> Excluir Assinatura
        </button>
      </div>

      {/* Modal Editar Assinatura */}
      <div className="modal fade" id="editarAssinaturaModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Editar Assinatura</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form id="formEditarAssinatura">
                <div className="mb-3">
                  <label className="form-label">Nome</label>
                  <input type="text" className="form-control" id="editNome" defaultValue={assinatura.nome} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Valor</label>
                  <input type="number" className="form-control" id="editValor" defaultValue={assinatura.valor} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Categoria</label>
                  <input type="text" className="form-control" id="editCategoria" defaultValue={assinatura.categoria} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Data de Vencimento</label>
                  <input type="date" className="form-control" id="editDataVencimento" defaultValue={assinatura.dataVencimento} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Método de Pagamento</label>
                  <input type="text" className="form-control" id="editMetodoPagamento" defaultValue={assinatura.metodoPagamento} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Notificação</label>
                  <input type="text" className="form-control" id="editNotificacao" defaultValue={assinatura.notificacao} required />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="submit" form="formEditarAssinatura" className="btn btn-primary">Salvar Alterações</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Excluir Assinatura */}
      <div className="modal fade" id="excluirAssinaturaModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Excluir Assinatura</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>Tem certeza que deseja excluir a assinatura <strong>{assinatura.nome}</strong>?</p>
              <p className="text-danger"><small>Esta ação não pode ser desfeita.</small></p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" className="btn btn-danger">Excluir</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetalhesAssinatura;