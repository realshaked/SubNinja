import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    assinaturas: [
        {
            id: 1,
            nome: 'Assinatura Básica',
            tipo: 'Mensal',
            preco: 29.90,
            periodo: 'Mensal',
            dataVencimento: '2023-10-01',
            metodoPagamento: 'Cartão de Crédito',
            notificacao: "email",
        },
        {
            id: 2,
            nome: 'Assinatura Premium',
            tipo: 'Anual',
            preco: 299.90,
            periodo: 'Anual',
            dataVencimento: '2024-10-01',
            metodoPagamento: 'PayPal',
            notificacao: "SMS",
        },
    ],
};

const assinaturaSlice = createSlice({
    name: 'assinaturas',
    initialState,
    reducers: {
        addAssinatura: (state, action) => {
            const proxId = state.assinaturas.length > 0
                ? Math.max(...state.assinaturas.map(a => a.id)) + 1
                : 1;
            state.assinaturas.push({ ...action.payload, id: proxId });
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