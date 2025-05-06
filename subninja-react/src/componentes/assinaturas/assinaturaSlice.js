import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    assinaturas: [
       
    ],
};

const assinaturaSlice = createSlice({
    name: 'assinaturas',
    initialState,
    reducers: {
        addAssinatura: (state, action) => {
            console.log('estado antes de adicionar: ', state.assinaturas);
            const proxId = state.assinaturas.length > 0
                ? Math.max(...state.assinaturas.map(a => a.id)) + 1
                : 1;
            state.assinaturas.push({ ...action.payload, id: proxId });
            console.log('Estado depois de adicionar:', state.assinaturas);
        },
        deleteAssinatura: (state, action) => {
            state.assinaturas = state.assinaturas.filter(assinatura => assinatura.id !== action.payload.id);
        },
        updateAssinatura: (state, action) => {
            const index = state.assinaturas.findIndex(a => a.id === action.payload.id);
            if (index !== -1) {
                state.assinaturas[index] = action.payload;
            }
        },
    },
});

export const { addAssinatura, deleteAssinatura, updateAssinatura } = assinaturaSlice.actions;
export default assinaturaSlice.reducer;