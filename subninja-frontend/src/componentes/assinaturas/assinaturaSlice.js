import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { fetchAssinaturas, updateAssinatura, deleteAssinatura } from './assinaturaThunks';
import { createAssinatura } from './assinaturaThunks';

const assinaturasAdapter = createEntityAdapter({
  selectId: (assinatura) => assinatura._id,
  sortComparer: (a, b) => a.nome.localeCompare(b.nome)
});

const initialState = assinaturasAdapter.getInitialState({
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
  assinaturaSelecionada: null,
});

const assinaturaSlice = createSlice({
  name: 'assinaturas',
  initialState,
  reducers: {
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
        console.log('fetchAssinaturas fulfilled', action.payload);
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
          id: action.payload._id,
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

export const {
  selectAssinatura,
  clearAssinaturaSelecionada,
  renovarAssinatura,
  alterarStatusAssinatura
} = assinaturaSlice.actions;

export const {
  selectAll: selectAllAssinaturas,
  selectById: selectAssinaturaPorId,
  selectIds: selectAssinaturaIds,
} = assinaturasAdapter.getSelectors((state) => state.assinaturas);

export default assinaturaSlice.reducer;