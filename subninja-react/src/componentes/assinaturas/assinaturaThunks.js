import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAssinaturas = createAsyncThunk(
  'assinaturas/fetchAssinaturas',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3001/assinaturas');
      if (!response.ok) throw new Error('Erro ao buscar assinaturas');
      return await response.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const createAssinatura = createAsyncThunk(
  'assinaturas/createAssinatura',
  async (novaAssinatura, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3001/assinaturas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaAssinatura),
      });
      return await response.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateAssinatura = createAsyncThunk(
  'assinaturas/updateAssinatura',
  async (assinatura, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3001/assinaturas/${assinatura.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(assinatura),
      });
      const data = await response.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteAssinatura = createAsyncThunk(
  'assinaturas/deleteAssinatura',
  async ( id, {rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3001/assinaturas/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error('Erro ao excluir a assinatura');
      }
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const fetchAssinaturaById = createAsyncThunk(
  'assinaturas/fetchAssinaturaById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3001/assinaturas/${id}`);
      if (!response.ok) throw new Error('Erro ao buscar assinatura');
      return await response.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);