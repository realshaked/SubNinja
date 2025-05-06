import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCategorias = createAsyncThunk(
  'categorias/fetchCategorias',
  async () => {
    return [
      { id: 1, nome: 'Streaming', cor: '#4361ee', icone: 'FaFilm' },
      { id: 2, nome: 'Software', cor: '#4cc9f0', icone: 'FaCode' },
      { id: 3, nome: 'Jogos', cor: '#7209b7', icone: 'FaGamepad' },
      { id: 4, nome: 'Música', cor: '#f72585', icone: 'FaMusic' },
    ];
  }
);

const initialState = {
  categorias: [],
  categoriaSelecionada: null,
  status: 'idle', // idle | loading | succeeded | failed
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
      });
  },
});

export const {
  addCategoria,
  editCategoria,
  deleteCategoria,
  selectCategoria,
  clearCategoriaSelecionada,
  abrirModal,
  fecharModal,
} = categoriasSlice.actions;

export default categoriasSlice.reducer;