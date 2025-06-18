import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditarNotificacao = ({ show, onHide, onSubmit, notificacao }) => {
  const [titulo, setTitulo] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    if (notificacao) {
      setTitulo(notificacao.titulo || "");
      setMensagem(notificacao.mensagem || "");
    }
  }, [notificacao]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...notificacao, titulo, mensagem });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Notificação</Modal.Title>
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
            Salvar Alterações
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditarNotificacao;