import { createSlice } from '@reduxjs/toolkit';
import { fetchAssinaturas, createAssinatura, updateAssinatura, deleteAssinatura } from './assinaturaThunks';

const assinaturasAdapter = createEntityAdapter({
    selectId: (assinatura) => assinatura.id,
    sortComparer: (a, b) => a.nome.localeCompare(b.nome),
});

const initialState = assinaturasAdapter.getInitialState({
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
    modais: {
        novaAssinatura: false,
        editarAssinatura: false,   
        excluirAssinatura: false,
    },
    assinaturaSelecionada: null,
});

const assinaturaSlice = createSlice({
    name: 'assinaturas',
    initialState,
    reducers: {
        selectAssinatura: (state, action) => {
            state.assinaturaSelecionada = action.payload;
        },
        clearAssinaturaSelecionada: (state) => {
            state.assinaturaSelecionada = null;
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
            .addCase(fetchAssinaturas.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchAssinaturas.fulfilled, (state, action) => {
                state.status = 'succeeded';
                assinaturasAdapter.setAll(state, action.payload);
            })
            .addCase(fetchAssinaturas.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Erro desconhecido';
            })
            .addCase(createAssinatura.fulfilled, (state, action) => {
                assinaturasAdapter.addOne(state, action.payload);
            })
            .addCase(updateAssinatura.fulfilled, (state, action) => {
                assinaturasAdapter.updateOne(state, {
                    id: action.payload.id,
                    changes: action.payload,
                });
            })
            .addCase(deleteAssinatura.fulfilled, (state, action) => {
                assinaturasAdapter.removeOne(state, action.payload);
            });
    },
});


export const {
    selectAll: selectAllAssinaturas,
    selectById: selectAssinaturaPorId,
    selectIds: selectAssinaturaIds,
} = assinaturasAdapter.getSelectors((state) => state.assinaturas);

export const {
    selectAssinatura,
    clearAssinaturaSelecionada,
    abrirModal,
    fecharModal,
} = assinaturaSlice.actions;

export default assinaturaSlice.reducer;