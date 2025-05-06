import { createSlice } from '@reduxjs/toolkit'

export const categoriasSlice = createSlice({
    name: 'categorias',
    initialState: {
        value: 0,
    },
    
    reducers: {
        demonstraSoma: (state) => {
            state.value += 1
        },
        demonstraSubtracao: (state) => {
            state.value -= 1
        },
        demonstraSomaControlada: (state, action) => {
            state.value += action.payload
        },
    },
})

export const { demonstraSoma, demonstraSubtracao, demonstraSomaControlada } = categoriasSlice.actions

export default categoriasSlice.reducer