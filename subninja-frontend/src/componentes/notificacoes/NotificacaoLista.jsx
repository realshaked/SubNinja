import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchNotificacoes, deleteNotificacao } from "./notificacoesThunks";
import { Button, Card, Row, Col, Spinner, Alert } from "react-bootstrap";

export default function NotificacaoLista() {
  const dispatch = useDispatch();
  const { itens, status, error } = useSelector((state) => state.notificacoes);

  useEffect(() => {
    dispatch(fetchNotificacoes());
  }, [dispatch]);

  if (status === "loading") return <Spinner animation="border" className="m-4" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Notificações</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {itens.map((n) => (
          <Col key={n._id}>
            <Card className={n.lida ? "border-secondary" : "border-primary"}>
              <Card.Body>
                <Card.Title>
                  <i className="bi bi-bell-fill me-2 text-primary" />
                  {n.titulo}
                </Card.Title>
                <Card.Text>{n.mensagem}</Card.Text>
                <div className="d-flex justify-content-between align-items-end">
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => dispatch(deleteNotificacao(n._id))}
                  >
                    <i className="bi bi-trash" /> Excluir
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {itens.length === 0 && (
        <Alert variant="info" className="mt-4">
          Nenhuma notificação cadastrada.
        </Alert>
      )}
    </div>
  );
}