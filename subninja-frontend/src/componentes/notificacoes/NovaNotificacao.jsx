import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addNotificacao } from "./notificacoesThunks";

const NovaNotificacao = ({ show, onHide, onSalvar }) => {
  const [titulo, setTitulo] = useState("");
  const [mensagem, setMensagem] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
     e.preventDefault();
     dispatch(addNotificacao({ titulo, mensagem }));
     setTitulo("");
     setMensagem("");
     onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Nova Notificação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mensagem</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary">
            Salvar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default NovaNotificacao;