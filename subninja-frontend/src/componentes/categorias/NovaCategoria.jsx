import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import icones from "../../icones";

const NovaCategoria = ({ show, onHide, onSalvar }) => {
  const [nome, setNome] = useState("");
  const [cor, setCor] = useState("#000000");
  const [icone, setIcone] = useState("FaQuestion");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSalvar({ nome, cor, icone });
    setNome("");
    setCor("#000000");
    setIcone("FaQuestion");
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Nova Categoria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nome da Categoria</Form.Label>
            <Form.Control
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Cor</Form.Label>
            <Form.Control
              type="color"
              value={cor}
              onChange={(e) => setCor(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ícone</Form.Label>
            <div className="d-flex gap-3 flex-wrap">
              {Object.keys(icones).map((key) => {
                const Icone = icones[key];
                return (
                  <Button
                    key={key}
                    variant={icone === key ? "primary" : "outline-secondary"}
                    onClick={() => setIcone(key)}
                  >
                    <Icone />
                  </Button>
                );
              })}
            </div>
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

export default NovaCategoria;