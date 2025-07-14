import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCategorias = createAsyncThunk(
  'categorias/fetchCategorias',
  async (_, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem('token'); // Seu token JWT
      const response = await fetch('/categorias', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error('Erro ao buscar categorias');
      
      const data = await response.json();
      
      // Retorna todas as categorias (padrão + usuário) com flag indicando o tipo
      return data.todas.map(categoria => ({
        ...categoria,
        isPadrao: data.padrao.some(p => p._id === categoria._id)
      }));
      
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const createCategoria = createAsyncThunk(
  'categorias/createCategoria',
  async (novaCategoria, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch('/categorias', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(novaCategoria),
      });
      
      if (!response.ok) throw new Error('Erro ao criar categoria');
      
      const data = await response.json();
      return {
        ...data,
        isPadrao: false // Categorias criadas pelo usuário nunca são padrão
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateCategoria = createAsyncThunk(
  'categorias/updateCategoria',
  async (categoria, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`/categorias/${categoria._id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(categoria),
      });
      
      if (!response.ok) throw new Error('Erro ao atualizar categoria');
      
      const data = await response.json();
      return {
        ...data,
        isPadrao: categoria.isPadrao // Mantém a flag original
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteCategoria = createAsyncThunk(
  'categorias/deleteCategoria',
  async ({ id, isPadrao }, { rejectWithValue }) => {
    try {
      // Não permite deletar categorias padrão
      if (isPadrao) {
        throw new Error('Não é possível excluir categorias padrão');
      }
      
      const token = sessionStorage.getItem('token');
      const response = await fetch(`/categorias/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
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

// Novo thunk para criar categoria padrão (apenas admin)
export const createCategoriaPadrao = createAsyncThunk(
  'categorias/createCategoriaPadrao',
  async (novaCategoria, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch('/categorias/padrao', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(novaCategoria),
      });
      
      if (!response.ok) throw new Error('Erro ao criar categoria padrão');
      
      const data = await response.json();
      return {
        ...data,
        isPadrao: true
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);