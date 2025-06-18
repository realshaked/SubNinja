import { createSlice } from '@reduxjs/toolkit';
import {
  fetchNotificacoes,
  addNotificacao,
  updateNotificacao,
  deleteNotificacao,
} from './notificacoesThunks';

const notificacoesSlice = createSlice({
  name: 'notificacoes',
  initialState: {
    itens: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotificacoes.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchNotificacoes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.itens = action.payload;
      })
      .addCase(fetchNotificacoes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Erro ao carregar notificações';
      })
      .addCase(addNotificacao.fulfilled, (state, action) => {
        state.itens.unshift(action.payload); // Adiciona no topo
      })
      .addCase(updateNotificacao.fulfilled, (state, action) => {
        const idx = state.itens.findIndex(n => n._id === action.payload._id);
        if (idx !== -1) state.itens[idx] = action.payload;
      })
      .addCase(deleteNotificacao.fulfilled, (state, action) => {
        state.itens = state.itens.filter(n => n._id !== action.payload);
      });
  },
});

export default notificacoesSlice.reducer;