import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchNotificacoes = createAsyncThunk(
  'notificacoes/fetchNotificacoes',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch('/notificacoes');
      if (!res.ok) throw new Error('Erro ao buscar notificações');
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const addNotificacao = createAsyncThunk(
  'notificacoes/addNotificacao',
  async (dados, { rejectWithValue }) => {
    try {
      const res = await fetch('/notificacoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
      });
      if (!res.ok) throw new Error('Erro ao criar notificação');
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateNotificacao = createAsyncThunk(
  'notificacoes/updateNotificacao',
  async ({ _id, ...dados }, { rejectWithValue }) => {
    try {
      const res = await fetch(`/notificacoes/${_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
      });
      if (!res.ok) throw new Error('Erro ao atualizar notificação');
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteNotificacao = createAsyncThunk(
  'notificacoes/deleteNotificacao',
  async (_id, { rejectWithValue }) => {
    try {
      const res = await fetch(`/notificacoes/${_id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Erro ao excluir notificação');
      return _id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);