import React from "react";
import { Modal, Button } from "react-bootstrap";

const ExcluirAssinatura = ({ show, onHide, onConfirm, assinatura }) => {
  const handleConfirm = () => {
    onConfirm(assinatura.id);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          Excluir
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ExcluirAssinatura;