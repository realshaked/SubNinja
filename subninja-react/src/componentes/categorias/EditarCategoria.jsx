import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaFilm, FaGamepad, FaMusic, FaCode, FaQuestion, FaBook, FaHeartbeat, FaUsers } from 'react-icons/fa';

const icones = {
  Streaming: <FaFilm />,
  Jogos: <FaGamepad />,
  Música: <FaMusic />,
  Software: <FaCode />,
  Educação: <FaBook />,
  Saúde: <FaHeartbeat />,
  Família: <FaUsers />,
  Outro: <FaQuestion />,
};

const EditarCategoria = ({
  show,
  onHide,
  onSubmit,
  nome,
  cor,
  icone,
  setNome,
  setCor,
  setIcone,
}) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Form onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Categoria</Modal.Title>
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
              {Object.entries(icones).map(([key, Icon]) => (
                <Button
                  key={key}
                  variant={icone === key ? 'primary' : 'outline-secondary'}
                  onClick={() => setIcone(key)}
                >
                  {Icon}
                </Button>
              ))}
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
