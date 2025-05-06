import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Ação assíncrona para buscar categorias do servidor
export const fetchCategorias = createAsyncThunk(
  'categorias/fetchCategorias',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/categorias'); // Substitua pela URL real da API
      return response.data; // Retorna os dados da API
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Erro ao buscar categorias');
    }
  }
);

const initialState = {
  categorias: [],
  categoriaSelecionada: null,
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

const categoriasSlice = createSlice({
  name: 'categorias',
  initialState,
  reducers: {
    addCategoria: (state, action) => {
      const proxId = state.categorias.length > 0
        ? Math.max(...state.categorias.map(cat => cat.id)) + 1
        : 1;
      state.categorias.push({ ...action.payload, id: proxId });
    },
    editCategoria: (state, action) => {
      const index = state.categorias.findIndex(cat => cat.id === action.payload.id);
      if (index !== -1) {
        state.categorias[index] = { ...state.categorias[index], ...action.payload };
      }
    },
    deleteCategoria: (state, action) => {
      state.categorias = state.categorias.filter(cat => cat.id !== action.payload.id);
    },
    selectCategoria: (state, action) => {
      state.categoriaSelecionada = action.payload;
    },
    clearCategoriaSelecionada: (state) => {
      state.categoriaSelecionada = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategorias.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCategorias.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categorias = action.payload; // Atualiza o estado com os dados da API
      })
      .addCase(fetchCategorias.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Erro desconhecido';
      });
  },
});

export const {
  addCategoria,
  editCategoria,
  deleteCategoria,
  selectCategoria,
  clearCategoriaSelecionada,
} = categoriasSlice.actions;

export default categoriasSlice.reducer;