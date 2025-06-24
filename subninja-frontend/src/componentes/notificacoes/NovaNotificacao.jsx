import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addNotificacao } from "./notificacoesThunks";

const NovaNotificacao = ({ show, onHide }) => {
  const dispatch = useDispatch();

  const [titulo, setTitulo] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [dataEnvio, setDataEnvio] = useState("");
  const [canal, setCanal] = useState("app");

  const handleSubmit = (e) => {
    e.preventDefault();

    const novaNotificacao = {
      titulo,
      mensagem,
      data_envio_programada: dataEnvio,
      canal,
      status: "Pendente", // Pode deixar fixo por enquanto
    };

    dispatch(addNotificacao(novaNotificacao));

    // Resetando os campos
    setTitulo("");
    setMensagem("");
    setDataEnvio("");
    setCanal("app");

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
            Salvar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default NovaNotificacao;
