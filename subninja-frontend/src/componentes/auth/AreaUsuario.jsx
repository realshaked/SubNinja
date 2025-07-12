import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout as logoutThunk, atualizarUsuario } from "./authThunks";
import { useNavigate } from "react-router-dom";

export default function AreaUsuario() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, status } = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    username: "",
    email: "",
    telefone: "",
  });

  // Inicializa dados de edição quando o usuário carrega
  useEffect(() => {
    if (user) {
      setEditData({
        username: user.username || "",
        email: user.email || "",
        telefone: user.telefone || "",
      });
    }
  }, [user]);

  const handleLogout = async () => {
    if (window.confirm("Tem certeza que deseja sair?")) {
      try {
        await dispatch(logoutThunk()).unwrap();
        // Redirecionar para login após logout bem-sucedido
        navigate("/login");
      } catch (error) {
        console.error("Erro ao fazer logout:", error);
        // Mesmo com erro, redireciona (o estado já foi limpo)
        navigate("/login");
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      // Chama o thunk para atualizar os dados do usuário
      await dispatch(atualizarUsuario(editData)).unwrap();

      setIsEditing(false);
      alert("Dados atualizados com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar dados. Tente novamente.");
    }
  };

  const handleCancel = () => {
    // Restaura os dados originais
    if (user) {
      setEditData({
        username: user.username || "",
        email: user.email || "",
        telefone: user.telefone || "",
      });
    }
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Não informado";
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const getRoleDisplay = (role) => {
    const roleMap = {
      admin: "Administrador",
      user: "Usuário",
    };
    return roleMap[role] || role;
  };

  // Se não estiver autenticado, não mostra o componente
  if (!isAuthenticated || !user) {
    return (
      <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="text-center">
          <h2 className="mb-4">Acesso Negado</h2>
          <p className="text-muted">
            Você precisa estar logado para acessar esta página.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid bg-light min-vh-100 py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            {/* Header */}
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col">
                    <div className="d-flex align-items-center">
                      <div
                        className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{ width: "60px", height: "60px" }}
                      >
                        <i
                          className="bi bi-person-fill text-white"
                          style={{ fontSize: "24px" }}
                        ></i>
                      </div>
                      <div>
                        <h2 className="mb-1">{user.username}</h2>
                        <p className="text-muted mb-0">
                          {getRoleDisplay(user.role)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="d-flex gap-2">
                      <button
                        onClick={handleEdit}
                        disabled={status === "loading"}
                        className="btn btn-primary"
                      >
                        <i className="bi bi-pencil me-2"></i>
                        Editar
                      </button>
                      <button
                        onClick={handleLogout}
                        disabled={status === "loading"}
                        className="btn btn-danger"
                      >
                        <i className="bi bi-box-arrow-right me-2"></i>
                        {status === "loading" ? "Saindo..." : "Sair"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Informações do Usuário */}
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center mb-4">
                  <i className="bi bi-gear me-2 text-muted"></i>
                  <h3 className="mb-0">Informações da Conta</h3>
                </div>

                <div className="row g-4">
                  {/* Username */}
                  <div className="col-md-6">
                    <label className="form-label">Nome de Usuário</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.username}
                        onChange={(e) =>
                          handleInputChange("username", e.target.value)
                        }
                        className="form-control"
                        placeholder="Digite seu nome de usuário"
                      />
                    ) : (
                      <div className="d-flex align-items-center">
                        <i className="bi bi-person me-2 text-muted"></i>
                        <span>{user.username}</span>
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="form-control"
                        placeholder="Digite seu email"
                      />
                    ) : (
                      <div className="d-flex align-items-center">
                        <i className="bi bi-envelope me-2 text-muted"></i>
                        <span>{user.email || "Não informado"}</span>
                      </div>
                    )}
                  </div>

                  {/* Telefone */}
                  <div className="col-md-6">
                    <label className="form-label">Telefone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editData.telefone}
                        onChange={(e) =>
                          handleInputChange("telefone", e.target.value)
                        }
                        className="form-control"
                        placeholder="Digite seu telefone"
                      />
                    ) : (
                      <div className="d-flex align-items-center">
                        <i className="bi bi-telephone me-2 text-muted"></i>
                        <span>{user.telefone || "Não informado"}</span>
                      </div>
                    )}
                  </div>

                  {/* Função - Não editável */}
                  <div className="col-md-6">
                    <label className="form-label">Função</label>
                    <div className="d-flex align-items-center">
                      <i className="bi bi-briefcase me-2 text-muted"></i>
                      <span>{getRoleDisplay(user.role)}</span>
                      <small className="text-muted ms-2">(Não editável)</small>
                    </div>
                  </div>
                </div>

                {/* Informações Adicionais */}
                <hr className="my-4" />
                <h4 className="mb-3">Informações do Sistema</h4>
                <div className="row g-3">
                  {user.id && (
                    <div className="col-md-4">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-hash me-2 text-muted"></i>
                        <div>
                          <small className="text-muted d-block">
                            ID do Usuário
                          </small>
                          <strong>{user.id}</strong>
                        </div>
                      </div>
                    </div>
                  )}
                  {user.createdAt && (
                    <div className="col-md-4">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-calendar-plus me-2 text-muted"></i>
                        <div>
                          <small className="text-muted d-block">
                            Membro desde
                          </small>
                          <strong>{formatDate(user.createdAt)}</strong>
                        </div>
                      </div>
                    </div>
                  )}
                  {user.lastLogin && (
                    <div className="col-md-4">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-clock me-2 text-muted"></i>
                        <div>
                          <small className="text-muted d-block">
                            Último acesso
                          </small>
                          <strong>{formatDate(user.lastLogin)}</strong>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Botões de Ação (quando editando) */}
                {isEditing && (
                  <div className="mt-4">
                    <div className="d-flex gap-2">
                      <button
                        onClick={handleSave}
                        disabled={status === "loading"}
                        className="btn btn-success"
                      >
                        <i className="bi bi-check-lg me-2"></i>
                        {status === "loading"
                          ? "Salvando..."
                          : "Salvar Alterações"}
                      </button>
                      <button
                        onClick={handleCancel}
                        disabled={status === "loading"}
                        className="btn btn-secondary"
                      >
                        <i className="bi bi-x-lg me-2"></i>
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Loading */}
      {status === "loading" && (
        <div
          className="modal d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body text-center py-4">
                <div className="spinner-border text-primary mb-3" role="status">
                  <span className="visually-hidden">Carregando...</span>
                </div>
                <p className="mb-0">Processando...</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
