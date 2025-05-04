import React from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';

const navigate = useNavigate();

const DetalhesAssinatura = ({ id, nome, tipo, preco, dataVencimento, periodo, metodoPagamento, notificacao}) => {
  const location = useLocation();
  const assinatura = location.state;

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
              <span className="badge bg-primary" id="detailCategory">{assinatura.tipo}</span>
            </div>
          </div>

          <div className="details-grid">
            <div className="detail-item">
              <i className="bi bi-currency-dollar"></i>
              <div>
                <small className="text-muted">Valor</small>
                <p id="detailPrice">{assinatura.preco}</p>
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
              <div>
                <button className="btn btn-secondary" onClick={() => navigate('/categorias')}>
                  <i className="bi bi-arrow-left"></i> Ir para Categorias
                </button>
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
                {/* Campos do formulário */}
                <div className="mb-3">
                  <label className="form-label">Nome</label>
                  <input type="text" className="form-control" id="editNome" required />
                </div>
                {/* Outros campos... */}
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
              <p>Tem certeza que deseja excluir a assinatura <strong id="assinaturaNomeExcluir"></strong>?</p>
              <p className="text-danger"><small>Esta ação não pode ser desfeita.</small></p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" className="btn btn-danger" id="confirmarExclusaoAssinatura">Excluir</button>
            </div>
          </div>
        </div>
      </div>
    </>
      
  );
};

export default DetalhesAssinatura;