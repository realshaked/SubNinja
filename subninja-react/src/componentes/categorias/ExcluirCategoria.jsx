import React from "react";
import { Modal, Button } from "react-bootstrap";

const ExcluirCategoria = ({ show, onHide, onConfirm, nome }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Excluir Categoria</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Tem certeza que deseja excluir a categoria <strong>{nome}</strong>?
        </p>
        <p className="text-danger">
          <small>Esta ação não pode ser desfeita.</small>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Excluir
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ExcluirCategoria;
