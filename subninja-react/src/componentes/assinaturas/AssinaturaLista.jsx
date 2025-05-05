// NÃO precisa importar BrowserRouter, Routes, Route aqui
import { Link } from 'react-router-dom';
import AssinaturaCard from './AssinaturaCard';

function AssinaturaLista() {
  

  return (
    <div className="assinatura-lista">
      {assinaturas.map((assinatura) => (
        <AssinaturaCard
          key={assinatura.id}
          id={assinatura.id}
          nome={assinatura.nome}
          tipo={assinatura.tipo}
          preco={assinatura.preco}
          periodo={assinatura.periodo}
          dataVencimento={assinatura.dataVencimento}
          metodoPagamento={assinatura.metodoPagamento}
          notificacao={assinatura.notificacao}
        />
      ))}
    </div>
  );
}

export default AssinaturaLista;
