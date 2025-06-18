import React from "react";
import { Modal, Button } from "react-bootstrap";

const ExcluirNotificacao = ({ show, onHide, onConfirm, notificacao }) => (
  <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>Excluir Notificação</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      Tem certeza que deseja excluir a notificação <strong>{notificacao?.titulo}</strong>?
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

export default ExcluirNotificacao;