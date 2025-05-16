import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { fetchAssinaturas, updateAssinatura, deleteAssinatura } from './assinaturaThunks';
import { createAssinatura } from './assinaturaThunks';

// Criando o adapter para as assinaturas
const assinaturasAdapter = createEntityAdapter({
  // Utilizando o id como identificador único
  selectId: (assinatura) => assinatura.id,
  // Ordenando por nome (como no seu slice original)
  sortComparer: (a, b) => a.nome.localeCompare(b.nome)
});

// Estado inicial do adapter, mantendo os elementos do seu estado original sem modais
const initialState = assinaturasAdapter.getInitialState({
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
  assinaturaSelecionada: null,
});

// Criando o slice para assinaturas
const assinaturaSlice = createSlice({
  name: 'assinaturas',
  initialState,
  reducers: {
    // Ações para gerenciamento da assinatura selecionada
    selectAssinatura: (state, action) => {
      state.assinaturaSelecionada = action.payload;
    },
    clearAssinaturaSelecionada: (state) => {
      state.assinaturaSelecionada = null;
    },
    
    // Renovar uma assinatura (recalcular data de vencimento)
    renovarAssinatura: (state, action) => {
      const { id } = action.payload;
      const assinatura = state.entities[id];
      
      if (assinatura) {
        // Cálculo da nova data de vencimento baseado na frequência
        const dataAtual = new Date(assinatura.dataVencimento);
        let novaData = new Date(dataAtual);
        
        switch (assinatura.frequencia) {
          case 'mensal':
            novaData.setMonth(dataAtual.getMonth() + 1);
            break;
          case 'trimestral':
            novaData.setMonth(dataAtual.getMonth() + 3);
            break;
          case 'semestral':
            novaData.setMonth(dataAtual.getMonth() + 6);
            break;
          case 'anual':
            novaData.setFullYear(dataAtual.getFullYear() + 1);
            break;
          case 'semanal':
            novaData.setDate(dataAtual.getDate() + 7);
            break;
          default:
            break;
        }
        
        // Atualiza a assinatura com a nova data de vencimento
        assinaturasAdapter.updateOne(state, {
          id,
          changes: {
            dataVencimento: novaData.toISOString().split('T')[0],
            ultimaRenovacao: new Date().toISOString()
          }
        });
      }
    },
    
    /* // Alterar status de uma assinatura (ativa/cancelada/pendente)
    alterarStatusAssinatura: (state, action) => {
      const { id, status } = action.payload;
      assinaturasAdapter.updateOne(state, {
        id,
        changes: { status }
      });
    } */
  },
  extraReducers: (builder) => {
    builder
     
      .addCase(fetchAssinaturas.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAssinaturas.fulfilled, (state, action) => {
        state.status = 'succeeded';
        assinaturasAdapter.setAll(state, action.payload);
      })
      .addCase(fetchAssinaturas.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Erro desconhecido';
      })
      .addCase(createAssinatura.fulfilled, (state, action) => {
    const assinatura = action.payload;
    if (!assinatura.dataVencimento && assinatura.dataAssinatura && assinatura.frequencia) {
      try {
        // Garantir que a data está em formato adequado
        const dataAssinatura = new Date(assinatura.dataAssinatura);
        
        // Verificar se a data é válida
        if (isNaN(dataAssinatura.getTime())) {
          console.error('Data de assinatura inválida:', assinatura.dataAssinatura);
          // Tratamento para data inválida (pode ser um valor padrão ou lançar erro)
        } else {
          // Criar uma nova data para evitar modificar a original
          let dataVencimento = new Date(dataAssinatura);
          
          // Usar uma função segura para adicionar meses
          const addMonths = (date, months) => {
            const newDate = new Date(date);
            const currentMonth = newDate.getMonth();
            const targetMonth = currentMonth + months;
            
            // Definir novo mês
            newDate.setMonth(targetMonth);
            
            // Verificar se houve overflow de dias (ex: 31 Jan → 31 Fev que não existe)
            if (newDate.getMonth() !== (targetMonth % 12)) {
              // Ajustar para o último dia do mês anterior
              newDate.setDate(0);
            }
            
            return newDate;
          };
          
          switch (assinatura.frequencia) {
            case 'mensal':
              dataVencimento = addMonths(dataAssinatura, 1);
              break;
            case 'trimestral':
              dataVencimento = addMonths(dataAssinatura, 3);
              break;
            case 'semestral':
              dataVencimento = addMonths(dataAssinatura, 6);
              break;
            case 'anual':
              dataVencimento.setFullYear(dataAssinatura.getFullYear() + 1);
              break;
            case 'semanal':
              dataVencimento.setDate(dataAssinatura.getDate() + 7);
              break;
            default:
              break;
          }
          
          // Formatação para YYYY-MM-DD
          assinatura.dataVencimento = dataVencimento.toISOString().split('T')[0];
        }
      } catch (error) {
        console.error('Erro ao calcular data de vencimento:', error);
        // Tratamento do erro
      }
    }
    
    assinaturasAdapter.addOne(state, assinatura);
})
      .addCase(updateAssinatura.fulfilled, (state, action) => {
        assinaturasAdapter.updateOne(state, {
          id: action.payload.id,
          changes: action.payload,
        });
      })
      .addCase(deleteAssinatura.fulfilled, (state, action) => {
        assinaturasAdapter.removeOne(state, action.payload);
        state.status = 'succeeded';
      })
      .addCase(deleteAssinatura.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Erro ao excluir a assinatura';
      });
  },
});

// Exportando ações
export const {
  selectAssinatura,
  clearAssinaturaSelecionada,
  renovarAssinatura,
  alterarStatusAssinatura
} = assinaturaSlice.actions;

// Seletores gerados pelo adapter
export const {
  selectAll: selectAllAssinaturas,
  selectById: selectAssinaturaPorId,
  selectIds: selectAssinaturaIds,
} = assinaturasAdapter.getSelectors((state) => state.assinaturas);

/* export const selectAssinaturasAtivas = (state) => {
  const assinaturas = selectAllAssinaturas(state);
  return assinaturas.filter(assinatura => assinatura.status === 'ativa');
};

export const selectAssinaturasPorCategoria = (state, categoria) => {
  const assinaturas = selectAllAssinaturas(state);
  return assinaturas.filter(assinatura => assinatura.categoria === categoria);
};

export const selectAssinaturasVencendo = (state, diasAntecipacao = 7) => {
  const assinaturas = selectAllAssinaturas(state);
  const hoje = new Date();
  const limite = new Date();
  limite.setDate(hoje.getDate() + diasAntecipacao);
  
  return assinaturas.filter(assinatura => {
    const dataVencimento = new Date(assinatura.dataVencimento);
    return dataVencimento >= hoje && dataVencimento <= limite && assinatura.status === 'ativa';
  }); 
}; */

// Exportando o reducer
export default assinaturaSlice.reducer;