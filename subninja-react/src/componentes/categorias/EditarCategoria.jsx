import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditarCategoria = ({
  show,
  onHide,
  onSubmit,
  nome,
  cor,
  setNome,
  setCor,
}) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Form onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Categoria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="editarCategoriaNome">
            <Form.Label>Nome da Categoria</Form.Label>
            <Form.Control
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="editarCategoriaCor">
            <Form.Label>Cor</Form.Label>
            <div className="d-flex align-items-center">
              <Form.Control
                type="color"
                value={cor}
                onChange={(e) => setCor(e.target.value)}
                className="form-control-color"
                title="Escolha uma cor"
              />
              <span className="ms-3">Selecione uma cor para a categoria</span>
            </div>
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

export default EditarCategoria;
