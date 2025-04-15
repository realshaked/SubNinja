// components/SubscriptionList.jsx
import AssinaturaCard from './AssinaturaCard';

function AssinaturaLista() {
  const assinaturas = [
    {
      id: 1,
      nome: 'Assinatura 1',
      tipo: 'Básica',
      preco: 'R$100,00',
      periodo: '/mês',
      dataVencimento: 'Em 2 dias'
    },
    {
      id: 2,
      nome: 'Assinatura 2',
      tipo: 'Premium',
      preco: 'R$54,90',
      periodo: '/mês',
      dataVencimento: 'Em 1 mês'
    },
    {
      id: 3,
      nome: 'Assinatura 3',
      tipo: 'Família',
      preco: 'R$200,00',
      periodo: '/ano',
      dataVencimento: 'Em 9 meses'
    },
    {
      id: 4,
      nome: 'Assinatura 4',
      tipo: 'Professional',
      preco: 'R$45,90',
      periodo: '/mês',
      dataVencimento: 'Hoje'
    },
    {
      id: 5,
      nome: 'Assinatura 5',
      tipo: 'Essential',
      preco: 'R$100,00',
      periodo: '/mês',
      dataVencimento: 'Em 2 dias'
    }
  ];

  return (
    <div className="assinatura-lista">
      {assinaturas.map((assinatura) => (
        <AssinaturaCard
          key ={assinatura.id}
          nome={assinatura.nome}
          tipo={assinatura.tipo}
          preco={assinatura.preco}      
          periodo={assinatura.periodo}
          dataVencimento={assinatura.dataVencimento}
        />
      ))}
    </div>
  );
}

export default AssinaturaLista;