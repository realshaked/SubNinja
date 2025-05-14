import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditarAssinatura = ({ show, onHide, onSubmit, assinatura }) => {
  const [nome, setNome] = useState(assinatura?.nome || "");
  const [valor, setValor] = useState(assinatura?.valor || 0);
  const [categoria, setCategoria] = useState(assinatura?.categoria || "");
  const [dataVencimento, setDataVencimento] = useState(assinatura?.dataVencimento || "");
  const [metodoPagamento, setMetodoPagamento] = useState(assinatura?.metodoPagamento || "");
  const [notificacao, setNotificacao] = useState(assinatura?.notificacao || "");

  useEffect(() => {
    if (assinatura) {
      setNome(assinatura.nome);
      setValor(assinatura.valor);
      setCategoria(assinatura.categoria);
      setDataVencimento(assinatura.dataVencimento);
      setMetodoPagamento(assinatura.metodoPagamento);
      setNotificacao(assinatura.notificacao);
    }
  }, [assinatura]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: assinatura.id,
      nome,
      valor,
      categoria,
      dataVencimento,
      metodoPagamento,
      notificacao
    });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Assinatura</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Valor</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              value={valor}
              onChange={(e) => setValor(parseFloat(e.target.value))}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Categoria</Form.Label>
            <Form.Control
              type="text"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Data de Vencimento</Form.Label>
            <Form.Control
              type="date"
              value={dataVencimento}
              onChange={(e) => setDataVencimento(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Método de Pagamento</Form.Label>
            <Form.Control
              type="text"
              value={metodoPagamento}
              onChange={(e) => setMetodoPagamento(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Notificação</Form.Label>
            <Form.Control
              type="text"
              value={notificacao}
              onChange={(e) => setNotificacao(e.target.value)}
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

export default EditarAssinatura;