import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAssinatura } from "./assinaturaThunks";

const ExcluirAssinatura = ({ show, onHide, assinatura }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleConfirm = async () => {
    if (!assinatura?.id) {
      setError("ID da assinatura inválido");
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      await dispatch(deleteAssinatura(assinatura.id)).unwrap();
      onHide(); // Fecha o modal
      navigate("/"); // Redireciona para a home page
    } catch (err) {
      console.error("Falha ao excluir assinatura:", err);
      setError(
        err.message ||
          "Falha ao excluir assinatura. Por favor, tente novamente."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal show={show} onHide={isDeleting ? null : onHide}>
      <Modal.Header closeButton={!isDeleting}>
        <Modal.Title>Excluir Assinatura</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Tem certeza que deseja excluir a assinatura{" "}
          <strong>{assinatura?.nome}</strong>?
        </p>
        <p className="text-danger">
          <small>Esta ação não pode ser desfeita.</small>
        </p>

        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={isDeleting}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleConfirm} disabled={isDeleting}>
          {isDeleting ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Excluindo...
            </>
          ) : (
            "Excluir"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ExcluirAssinatura;
