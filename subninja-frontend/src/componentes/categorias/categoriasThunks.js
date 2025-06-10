import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCategorias = createAsyncThunk(
  'categorias/fetchCategorias',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/categorias');
      if (!response.ok) throw new Error('Erro ao buscar categorias');
      return await response.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const createCategoria = createAsyncThunk(
  'categorias/createCategoria',
  async (novaCategoria, { rejectWithValue }) => {
    try {
      const response = await fetch('/categorias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaCategoria),
      });
      return await response.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateCategoria = createAsyncThunk(
  'categorias/updateCategoria',
  async (categoria, { rejectWithValue }) => {
    try {
      const response = await fetch(`/categorias/${categoria.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoria),
      });
      const data = await response.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteCategoria = createAsyncThunk(
    'categorias/deleteCategoria',
    async ({ id }, { rejectWithValue }) => {
      try {
        const response = await fetch(`/categorias/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Erro ao excluir a categoria');
        }
        return id;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );