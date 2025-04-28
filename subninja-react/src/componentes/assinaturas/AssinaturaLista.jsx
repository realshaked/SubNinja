import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AssinaturaCard from './AssinaturaCard';
import DetalhesAssinatura from './DetalhesAssinatura';

function AssinaturaLista() {
  const assinaturas = [
    {
      id: 1,
      nome: 'Netflix',
      tipo: 'Básica',
      preco: 'R$100,00',
      periodo: '/mês',
      dataVencimento: 'Em 2 dias',
      metodoPagamento: 'Cartão de crédito',
      notificacao: 'E-mail'
    },
    {
      id: 2,
      nome: 'Spotify',
      tipo: 'Premium',
      preco: 'R$54,90',
      periodo: '/mês',
      dataVencimento: 'Em 1 mês',
      metodoPagamento: 'PIX',
      notificacao: 'SMS'

    },
    {
      id: 3,
      nome: 'Amazon Prime',
      tipo: 'Família',
      preco: 'R$200,00',
      periodo: '/ano',
      dataVencimento: 'Em 9 meses',
      metodoPagamento: 'Cartão de crédito',
      notificacao: 'E-mail'
    },
    {
      id: 4,
      nome: 'Max',
      tipo: 'Professional',
      preco: 'R$45,90',
      periodo: '/mês',
      dataVencimento: 'Hoje',
      metodoPagamento: 'Cartão de crédito',
      notificacao: 'E-mail'
    },
    {
      id: 5,
      nome: 'Disney+',
      tipo: 'Premium',
      preco: 'R$100,00',
      periodo: '/mês',
      dataVencimento: 'Em 2 dias',
      metodoPagamento: 'Cartão de crédito',
      notificacao: 'E-mail'
    }
  ];
  return (
    <Router>
      <Routes>
        <Route 
          path ="/"
          element = {
            <div className="assinatura-lista">
              {assinaturas.map((assinatura) => (
              <AssinaturaCard
              key ={assinatura.id}
              id = {assinatura.id}
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
          }
        />
        <Route path = "/assinatura/:id" element={
          <DetalhesAssinatura />} />
      </Routes>
    </Router>
  );
}

export default AssinaturaLista;