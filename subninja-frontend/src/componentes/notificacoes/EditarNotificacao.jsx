import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditarNotificacao = ({ show, onHide, onSubmit, notificacao }) => {
  const [titulo, setTitulo] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [dataEnvio, setDataEnvio] = useState("");
  const [canal, setCanal] = useState("");

  useEffect(() => {
    if (notificacao) {
      setTitulo(notificacao.titulo || "");
      setMensagem(notificacao.mensagem || "");
      setDataEnvio(
        notificacao.data_envio_programada
          ? new Date(notificacao.data_envio_programada).toISOString().slice(0, 16)
          : ""
      );
      setCanal(notificacao.canal || "app");
    }
  }, [notificacao]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...notificacao,
      titulo,
      mensagem,
      data_envio_programada: dataEnvio,
      canal,
    });
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

          <Form.Group className="mb-3">
            <Form.Label>Data de Envio Programada</Form.Label>
            <Form.Control
              type="datetime-local"
              value={dataEnvio}
              onChange={(e) => setDataEnvio(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Canal de Envio</Form.Label>
            <Form.Select
              value={canal}
              onChange={(e) => setCanal(e.target.value)}
              required
            >
              <option value="app">App</option>
              <option value="email">Email</option>
              <option value="sms">SMS</option>
            </Form.Select>
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
