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
import { selectAllCategorias } from '../categorias/categoriasSlice';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function Relatorios() {
  const [filtro, setFiltro] = useState('Ano');
  const [modoGrafico, setModoGrafico] = useState('assinaturas');
  const assinaturas = useSelector(selectAllAssinaturas);
  const categorias = useSelector(selectAllCategorias);

  // Conversão de cada frequência para o período desejado
  function valorConvertido(assinatura, periodo) {
    const freq = (assinatura.frequencia || '').toLowerCase();
    const valor = Number(assinatura.valor) || 0;

    // Todas as conversões para 1 unidade do período desejado
    if (periodo === 'Ano') {
      if (freq === 'mensal') return valor * 12;
      if (freq === 'anual') return valor;
      if (freq === 'semanal') return valor * 52;
      if (freq === 'trimestral') return valor * 4;
      if (freq === 'semestral') return valor * 2;
      return valor; // pagamento único, assume anual
    }
    if (periodo === 'Mês') {
      if (freq === 'mensal') return valor;
      if (freq === 'anual') return valor / 12;
      if (freq === 'semanal') return (valor * 52) / 12;
      if (freq === 'trimestral') return valor / 3;
      if (freq === 'semestral') return valor / 6;
      return valor / 12; // pagamento único, assume anual
    }
    if (periodo === 'Semana') {
      if (freq === 'mensal') return (valor * 12) / 52;
      if (freq === 'anual') return valor / 52;
      if (freq === 'semanal') return valor;
      if (freq === 'trimestral') return (valor * 4) / 52;
      if (freq === 'semestral') return (valor * 2) / 52;
      return valor / 52; // pagamento único, assume anual
    }
    return valor;
  }

  // Label e filtro
  let labelPeriodo = filtro.toLowerCase();

  // Gasto por assinatura (convertido para o período)
  const valoresAssinatura = assinaturas.map(a => valorConvertido(a, filtro));
  const labelsAssinatura = assinaturas.map(a => a.nome);
  const gastoTotalAssinatura = valoresAssinatura.reduce((acc, val) => acc + val, 0);

  // Gasto por categoria (convertido para o período)
  const gastosPorCategoria = categorias.map(cat => {
    const total = assinaturas
      .filter(a => a.categoriaId === cat._id)
      .reduce((acc, a) => acc + valorConvertido(a, filtro), 0);
    return { ...cat, total };
  }).filter(cat => cat.total > 0);

  const gastoTotalCategoria = gastosPorCategoria.reduce((acc, cat) => acc + cat.total, 0);

  const COLORS = [
    '#8884d8', '#82ca9d', '#ffc658', '#ff8042',
    '#8dd1e1', '#d0ed57', '#a4de6c', '#ffbb28',
    '#ff6666', '#aa46be'
  ];

  const doughnutDataAssinatura = {
    labels: labelsAssinatura,
    datasets: [
      {
        data: valoresAssinatura,
        backgroundColor: COLORS.slice(0, valoresAssinatura.length),
        borderWidth: 2,
      },
    ],
  };

  const doughnutDataCategoria = {
    labels: gastosPorCategoria.map(cat => cat.nome),
    datasets: [
      {
        data: gastosPorCategoria.map(cat => cat.total),
        backgroundColor: gastosPorCategoria.map((cat, i) => cat.cor || COLORS[i % COLORS.length]),
        borderWidth: 2,
      },
    ],
  };

  if (!assinaturas || assinaturas.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h3 style={{ color: '#666' }}>Nenhuma assinatura cadastrada.</h3>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', color: '#4B0082' }}>Relatório de Gastos</h2>

      {/* Filtro de período */}
      <select
        value={filtro}
        onChange={e => setFiltro(e.target.value)}
        style={{ width: '100%', padding: '10px', margin: '20px 0', borderRadius: '8px' }}
      >
        <option>Ano</option>
        <option>Mês</option>
        <option>Semana</option>
      </select>

      {/* Botão para alternar modo do gráfico */}
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => setModoGrafico(modoGrafico === 'assinaturas' ? 'categorias' : 'assinaturas')}
        >
          {modoGrafico === 'assinaturas'
            ? "Ver gráfico por categoria"
            : "Ver gráfico por assinatura"}
        </button>
      </div>

      {/* Gráfico Doughnut */}
      <div style={{ backgroundColor: '#f9f9f9', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
        <h4 style={{ textAlign: 'center' }}>
          {modoGrafico === 'assinaturas'
            ? `Distribuição por Assinatura (${labelPeriodo})`
            : `Gasto por Categoria (${labelPeriodo})`}
        </h4>
        <Doughnut
          data={modoGrafico === 'assinaturas' ? doughnutDataAssinatura : doughnutDataCategoria}
          options={{
            plugins: {
              legend: {
                position: 'bottom',
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    const valor = context.raw;
                    const total = modoGrafico === 'assinaturas' ? gastoTotalAssinatura : gastoTotalCategoria;
                    const percentual = total > 0 ? ((valor / total) * 100).toFixed(0) : 0;
                    return `${context.label}: R$ ${valor.toFixed(2)} (${percentual}%)`;
                  }
                }
              }
            },
          }}
        />
        <h3 style={{ textAlign: 'center', marginTop: '10px' }}>
          R$ {(modoGrafico === 'assinaturas' ? gastoTotalAssinatura : gastoTotalCategoria).toFixed(2)} por {labelPeriodo}
        </h3>
      </div>

      {/* Lista de assinaturas */}
      {assinaturas.map((a, index) => {
        const valorTotal = valorConvertido(a, filtro);

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
                <strong>R$ {valorTotal.toFixed(2)} / {labelPeriodo}</strong>
                <div style={{
                  height: '5px', width: '100px', backgroundColor: '#eee', borderRadius: '5px',
                  marginTop: '5px'
                }}>
                  <div style={{
                    width: `${(valorTotal / gastoTotalAssinatura) * 100}%`,
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