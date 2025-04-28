import React from 'react';
import { Link } from 'react-router-dom';

export default function AssinaturaCard({ id, nome, tipo, preco, dataVencimento, periodo, metodoPagamento, notificacao }) {
  return (
    <Link
      to={`/assinatura/${id}`}
      state={{ id, nome, tipo, preco, dataVencimento, periodo, metodoPagamento, notificacao }}
      className="card-assinatura"
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div className="card-conteudo">
        <div className="icone-assinatura">
          <i className="icone"></i>
        </div>
        <div className="info-assinatura">
          <h3>{nome}</h3>
          <p className="text-muted">{tipo}</p>
          <div className="detalhes-assinatura">
            <p className="preco-assinatura">
              {preco}<span>{periodo}</span>
            </p>
            <div className="data-vencimento">
              <img className="calendario-icone" src="./src/assets/calendar.svg" alt="Ícone de calendário" />
              <p>{dataVencimento}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};