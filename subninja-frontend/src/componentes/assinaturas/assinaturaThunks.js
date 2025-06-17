import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAssinaturas = createAsyncThunk(
  'assinaturas/fetchAssinaturas',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/assinaturas');
      if (!response.ok) throw new Error('Erro ao buscar assinaturas');
   /*    const text = await response.text();
      if (!text) return []; // Retorna array vazio se não houver dados */
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
      const response = await fetch('/assinaturas', {
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
  "assinaturas/updateAssinatura",
  async (assinatura, { rejectWithValue }) => {
    try {
      const { _id, ...rest } = assinatura;
      const response = await fetch(`/assinaturas/${_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rest), // NÃO envie _id no body!
      });
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || "Erro ao atualizar assinatura");
      }
      return await response.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteAssinatura = createAsyncThunk(
  'assinaturas/deleteAssinatura',
  async ( id, {rejectWithValue }) => {
    try {
      const response = await fetch(`/assinaturas/${id}`, {
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
      const response = await fetch(`/assinaturas/${id}`);
      if (!response.ok) throw new Error('Erro ao buscar assinatura');
      return await response.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);