import { configureStore } from '@reduxjs/toolkit';
import assinaturaReducer from './componentes/assinaturas/assinaturaSlice';
import categoriasReducer from './componentes/categorias/categoriasSlice';

export default configureStore({
  reducer: {
    assinaturas: assinaturaReducer,
    categorias: categoriasReducer,
  },
});