import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

export default function AssinaturaCard(props) {
  console.log('propriedas recebidas: ', props);
  const {id, nome, tipo, preco, dataVencimento, frequencia, metodoPagamento, notificacao} = props;
  return (
    <Link
      to={`/assinatura/${id}`}
      state={{ id, nome, tipo, preco, dataVencimento, frequencia, metodoPagamento, notificacao }}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <Card className="mb-3 shadow-sm">
        <Card.Body>
          <div className="d-flex align-items-center">
            <div className="me-3">
              <i className="bi bi-card-checklist fs-2 text-primary"></i>
            </div>
            <div>
              <Card.Title className="mb-1">{nome}</Card.Title>
              <Card.Subtitle className="text-muted">{tipo}</Card.Subtitle>
            </div>
          </div>
          <div className="mt-3">
            <p className="mb-1">
              <strong>Preço:</strong> {preco} <span>{frequencia}</span>
            </p>
            <p className="mb-1">
              <strong>Vencimento:</strong> {dataVencimento}
            </p>
            <p className="mb-1">
              <strong>Método de Pagamento:</strong> {metodoPagamento}
            </p>
            <p className="mb-1">
              <strong>Notificação:</strong> {notificacao}
            </p>
          </div>
          <Button variant="primary" className="mt-3 w-100">
            Ver Detalhes
          </Button>
        </Card.Body>
      </Card>
    </Link>
  );
};