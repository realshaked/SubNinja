import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { useSelector } from 'react-redux';
import { selectAllAssinaturas } from '../assinaturas/assinaturaSlice';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function Relatorios() {
  const [filtro, setFiltro] = useState('Último ano');
  const assinaturas = useSelector(selectAllAssinaturas);
  const hoje = new Date();

  const mesesEntre = (inicio, fim) => {
    return (
      (fim.getFullYear() - inicio.getFullYear()) * 12 +
      (fim.getMonth() - inicio.getMonth()) +
      (fim.getDate() >= inicio.getDate() ? 0 : -1)
    );
  };

  const obterInicioPeriodo = () => {
    const d = new Date(hoje);
    if (filtro === 'Último mês') {
      d.setMonth(d.getMonth() - 1);
    } else if (filtro === 'Últimos 6 meses') {
      d.setMonth(d.getMonth() - 6);
    } else {
      d.setFullYear(d.getFullYear() - 1);
    }
    return d;
  };

  const inicioPeriodo = obterInicioPeriodo();

  const assinaturasFiltradas = assinaturas.filter((a) => {
    const dataCriacao = new Date(a.dataCriacao);
    return dataCriacao <= hoje && dataCriacao <= inicioPeriodo ? true : dataCriacao >= inicioPeriodo;
  });

  const valores = assinaturasFiltradas.map((a) => {
    const dataCriacao = new Date(a.dataCriacao);
    const inicioReal = dataCriacao > inicioPeriodo ? dataCriacao : inicioPeriodo;
    const meses = Math.max(1, mesesEntre(inicioReal, hoje));
    return a.valor * meses;
  });

  const labels = assinaturasFiltradas.map((a) => a.nome);
  const categorias = assinaturasFiltradas.map((a) => a.categoria);

  const gastoTotal = valores.reduce((acc, val) => acc + val, 0);

  if (!assinaturas || assinaturas.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h3 style={{ color: '#666' }}>Nenhuma assinatura cadastrada.</h3>
      </div>
    );
  }

  const COLORS = [
    '#8884d8', '#82ca9d', '#ffc658', '#ff8042',
    '#8dd1e1', '#d0ed57', '#a4de6c', '#ffbb28',
    '#ff6666', '#aa46be'
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
      <select
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        style={{ width: '100%', padding: '10px', margin: '20px 0', borderRadius: '8px' }}
      >
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
                  label: function (context) {
                    const valor = context.raw;
                    const percentual = ((valor / gastoTotal) * 100).toFixed(0);
                    return `${context.label}: R$ ${valor.toFixed(2)} (${percentual}%)`;
                  }
                }
              }
            },
          }}
        />
        <h3 style={{ textAlign: 'center', marginTop: '10px' }}>R$ {gastoTotal.toFixed(2)}</h3>
      </div>

      {/* Total gasto */}
      <div style={{
        backgroundColor: '#fff', borderRadius: '12px', padding: '20px', textAlign: 'center',
        marginBottom: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ margin: 0, color: '#4B0082' }}>Total Gasto</h3>
        <h2 style={{ margin: '10px 0' }}>R$ {gastoTotal.toFixed(2)}</h2>
        <p style={{ margin: 0, color: 'gray' }}>
          no {filtro.toLowerCase()}
        </p>
      </div>

      {/* Lista de assinaturas */}
      {assinaturasFiltradas.map((a, index) => {
        const dataCriacao = new Date(a.dataCriacao);
        const inicioReal = dataCriacao > inicioPeriodo ? dataCriacao : inicioPeriodo;
        const meses = Math.max(1, mesesEntre(inicioReal, hoje));
        const valorTotal = a.valor * meses;

        return (
          <div key={a.id} style={{
            backgroundColor: '#fff', borderRadius: '12px', padding: '15px', marginBottom: '10px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>{a.nome}</strong>
                <p style={{ margin: 0, color: 'gray' }}>{a.categoria}</p>
              </div>
              <div>
                <strong>R$ {valorTotal.toFixed(2)}</strong>
                <div style={{
                  height: '5px', width: '100px', backgroundColor: '#eee', borderRadius: '5px',
                  marginTop: '5px'
                }}>
                  <div style={{
                    width: `${(valorTotal / gastoTotal) * 100}%`,
                    backgroundColor: '#4B0082',
                    height: '100%', borderRadius: '5px'
                  }}></div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
