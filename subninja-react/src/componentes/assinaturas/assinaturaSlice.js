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
        state.status = 'succeeded';
        const assinatura = action.payload;
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

// Exportando o reducer
export default assinaturaSlice.reducer;


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

 /* // Alterar status de uma assinatura (ativa/cancelada/pendente)
    alterarStatusAssinatura: (state, action) => {
      const { id, status } = action.payload;
      assinaturasAdapter.updateOne(state, {
        id,
        changes: { status }
      });
    } */