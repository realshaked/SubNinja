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

function addAssinatura(assinaturas,assinatura) {
    let proxId = 1 + assinaturas.map(a => a.id).reduce((a,b) => Math.max(a,b));
    return assinaturas.concat([{...action.payload, id: proxId}]);
}

function deleteAssinatura(assinaturas, id) {
    return assinaturas.filter(assinatura => assinatura.id !== id);
}

function updateAssinatura(assinaturas, assinatura) {
    let index = assinaturas.map(a => a.id).indexOf(action.payload.id);
    assinaturas.splice(index, 1, action.payload);
    return assinaturas;
}



const assinaturaSlice = createSlice({
    name:'assinaturas',
    initialState,
    reducers: {
        addAssinatura: (state, action) => {
            state.assinaturas = addAssinatura(state.assinaturas, action.payload);
        },
        deleteAssinatura: (state, action) => {
            state.assinaturas = deleteAssinatura(state.assinaturas, action.payload.id);
        },
        updateAssinatura: (state, action) => {
            state.assinaturas = updateAssinatura(state.assinaturas, action.payload);
        }

    }
});

export const { addAssinatura, deleteAssinatura, updateAssinatura } = assinaturaSlice.actions;
export default assinaturaSlice.reducer;