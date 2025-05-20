import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useSelector } from 'react-redux';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function Relatorios() {
  const assinaturas = useSelector((state) => state.assinaturas.assinaturas || []);
  const valores = assinaturas.map(a => Number(a.valor) || 0);
  const labels = assinaturas.map(a => a.nome);
  const categorias = assinaturas.map(a => a.categoria);

  const gastoTotal = valores.reduce((acc, val) => acc + val, 0);

   if (!assinaturas || assinaturas.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h3 style={{ color: '#666' }}>Nenhuma assinatura cadastrada.</h3>
      </div>
    );
  }

  const COLORS = [
    '#8884d8',  // Roxo
    '#82ca9d',  // Verde
    '#ffc658',  // Amarelo
    '#ff8042',  // Laranja
    '#8dd1e1',  // Azul claro
    '#d0ed57',  // Verde limão
    '#a4de6c',  // Verde mais claro
    '#ffbb28',  // Amarelo ouro
    '#ff6666',  // Vermelho suave
    '#aa46be'   // Roxo mais forte
  ];
  

  const doughnutData = {
    labels,
    datasets: [
      {
        data: valores,
        backgroundColor: COLORS.slice(0, valores.length),
        borderWidth: 2,
      },
    ],
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', color: '#4B0082' }}>Relatório de Gastos</h2>

      {/* Filtro de período */}
      <select style={{ width: '100%', padding: '10px', margin: '20px 0', borderRadius: '8px' }}>
        <option>Último ano</option>
        <option>Últimos 6 meses</option>
        <option>Último mês</option>
      </select>

      {/* Gráfico */}
      <div style={{ backgroundColor: '#f9f9f9', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
        <h4 style={{ textAlign: 'center' }}>Distribuição de Gastos</h4>
        <Doughnut 
          data={doughnutData} 
          options={{
            plugins: {
              legend: {
                position: 'bottom',
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    const valor = context.raw;
                    const percentual = ((valor / gastoTotal) * 100).toFixed(0);
                    return `${context.label}: R$ ${valor} (${percentual}%)`;
                  }
                }
              }
            },
          }} 
        />
        <h3 style={{ textAlign: 'center', marginTop: '10px' }}>R$ {gastoTotal.toFixed(2)}</h3>
      </div>

      {/* Total gasto */}
      <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '20px', textAlign: 'center', marginBottom: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
        <h3 style={{ margin: 0, color: '#4B0082' }}>Total Gasto</h3>
        <h2 style={{ margin: '10px 0' }}>R$ {gastoTotal.toFixed(2)}</h2>
        <p style={{ margin: 0, color: 'gray' }}>no último ano</p>
      </div>

      {/* Lista de assinaturas */}
      {assinaturas.map((a) => (
        <div key={a.id} style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '15px', marginBottom: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong>{a.nome}</strong>
              <p style={{ margin: 0, color: 'gray' }}>{a.categoria}</p>
            </div>
            <div>
              <strong>R$ {a.valor.toFixed(2)}/mês</strong>
              <div style={{ height: '5px', width: '100px', backgroundColor: '#eee', borderRadius: '5px', marginTop: '5px' }}>
                <div style={{ width: `${(a.valor / gastoTotal) * 100}%`, backgroundColor: '#4B0082', height: '100%', borderRadius: '5px' }}></div>
              </div>
            </div>
          </div>
        </div>
      ))}

    </div>
  );
}