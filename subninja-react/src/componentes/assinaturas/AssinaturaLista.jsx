// NÃO precisa importar BrowserRouter, Routes, Route aqui
import React from 'react';
import AssinaturaCard from './AssinaturaCard';
import { useSelector } from 'react-redux';

function AssinaturaLista() {

  const assinaturas = useSelector((state) => state.assinaturas.assinaturas);

  return (
    <div className="assinatura-lista">
      {assinaturas.map((assinatura) => (
        <AssinaturaCard
          key={assinatura.id}
          id={assinatura.id}
          nome={assinatura.nome}
          tipo={assinatura.tipo}
          preco={assinatura.preco}
          frequencia={assinatura.frequencia}
          dataVencimento={assinatura.dataVencimento}
          metodoPagamento={assinatura.metodoPagamento}
          notificacao={assinatura.notificacao}
          categoria={assinatura.categoria}
        />
      ))}
    </div>
  );
}

export default AssinaturaLista;