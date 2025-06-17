import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchCategorias, createCategoria, updateCategoria, deleteCategoria } from './categoriasThunks';

const categoriasAdapter = createEntityAdapter({
  selectId: (categoria) => categoria._id,
  sortComparer: (a, b) => a.nome.localeCompare(b.nome),
});

const initialState = categoriasAdapter.getInitialState({
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
  modais: {
    novaCategoria: false,
    editarCategoria: false,
    excluirCategoria: false,
  },
  categoriaSelecionada: null,
});

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
         console.log('fetchCategorias fulfilled', action.payload);
        state.status = 'succeeded';
        categoriasAdapter.setAll(state, action.payload);
      })
      .addCase(fetchCategorias.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Erro desconhecido';
      })
      .addCase(createCategoria.fulfilled, (state, action) => {
        categoriasAdapter.addOne(state, action.payload);
      })
      .addCase(updateCategoria.fulfilled, (state, action) => {
        categoriasAdapter.updateOne(state, {
          id: action.payload._id,
          changes: action.payload,
        });
      })
      .addCase(deleteCategoria.fulfilled, (state, action) => {
        categoriasAdapter.removeOne(state, action.payload);
      });
  },
});

export const {
  selectAll: selectAllCategorias,
  selectById: selectCategoriaById,
  selectIds: selectCategoriaIds,
} = categoriasAdapter.getSelectors((state) => state.categorias);

export const {
  selectCategoria,
  clearCategoriaSelecionada,
  abrirModal,
  fecharModal,
} = categoriasSlice.actions;

export default categoriasSlice.reducer;