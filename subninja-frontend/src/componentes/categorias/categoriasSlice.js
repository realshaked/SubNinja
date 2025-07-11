import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { 
  fetchCategorias, 
  createCategoria, 
  updateCategoria, 
  deleteCategoria,
  createCategoriaPadrao 
} from './categoriasThunks';

const categoriasAdapter = createEntityAdapter({
  selectId: (categoria) => categoria._id,
  sortComparer: (a, b) => {
    // Ordena primeiro por tipo (padrão primeiro), depois por nome
    if (a.isPadrao && !b.isPadrao) return -1;
    if (!a.isPadrao && b.isPadrao) return 1;
    return a.nome.localeCompare(b.nome);
  },
});

const initialState = categoriasAdapter.getInitialState({
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
  modais: {
    novaCategoria: false,
    editarCategoria: false,
    excluirCategoria: false,
    novaCategoriaPadrao: false, // Novo modal para admin
  },
  categoriaSelecionada: null,
  filtros: {
    mostrarPadrao: true,
    mostrarUsuario: true,
  }
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
    toggleFiltro: (state, action) => {
      state.filtros[action.payload] = !state.filtros[action.payload];
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
      .addCase(createCategoriaPadrao.fulfilled, (state, action) => {
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
      })
      .addCase(deleteCategoria.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

// Seletores personalizados
export const {
  selectAll: selectAllCategorias,
  selectById: selectCategoriaById,
  selectIds: selectCategoriaIds,
} = categoriasAdapter.getSelectors((state) => state.categorias);

// Seletores filtrados
export const selectCategoriasPadrao = (state) => 
  selectAllCategorias(state).filter(categoria => categoria.isPadrao);

export const selectCategoriasUsuario = (state) => 
  selectAllCategorias(state).filter(categoria => !categoria.isPadrao);

export const selectCategoriasFiltradas = (state) => {
  const todas = selectAllCategorias(state);
  const { mostrarPadrao, mostrarUsuario } = state.categorias.filtros;
  
  return todas.filter(categoria => {
    if (categoria.isPadrao && !mostrarPadrao) return false;
    if (!categoria.isPadrao && !mostrarUsuario) return false;
    return true;
  });
};

export const {
  selectCategoria,
  clearCategoriaSelecionada,
  abrirModal,
  fecharModal,
  toggleFiltro,
} = categoriasSlice.actions;

export default categoriasSlice.reducer;