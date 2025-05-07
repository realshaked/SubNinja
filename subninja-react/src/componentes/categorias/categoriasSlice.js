import { createSlice } from '@reduxjs/toolkit';
import { fetchCategorias, createCategoria, updateCategoria, deleteCategoria } from './categoriasThunks';

const initialState = {
  categorias: [],
  categoriaSelecionada: null,
  status: 'idle',
  error: null,
  modais: {
    novaCategoria: false,
    editarCategoria: false,
    excluirCategoria: false,
  },
};

const categoriasSlice = createSlice({
  name: 'categorias',
  initialState,
  reducers: {
    selectCategoria: (state, action) => {
      state.categoriaSelecionada = action.payload;
    },
    clearCategoriaSelecionada: (state) => {
      state.categoriaSelecionada = null;
    },
    abrirModal: (state, action) => {
      state.modais[action.payload] = true;
    },
    fecharModal: (state, action) => {
      state.modais[action.payload] = false;
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
        state.categorias = action.payload;
      })
      .addCase(fetchCategorias.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Erro desconhecido';
      })
      .addCase(createCategoria.fulfilled, (state, action) => {
        state.categorias.push(action.payload);
      })
      .addCase(updateCategoria.fulfilled, (state, action) => {
        const index = state.categorias.findIndex(cat => cat.id === action.payload.id);
        if (index !== -1) {
          state.categorias[index] = action.payload;
        }
      })
      .addCase(deleteCategoria.fulfilled, (state, action) => {
        state.categorias = state.categorias.filter(cat => cat.id !== action.payload);
      });
  },
});

export const {
  selectCategoria,
  clearCategoriaSelecionada,
  abrirModal,
  fecharModal,
} = categoriasSlice.actions;

export default categoriasSlice.reducer;
