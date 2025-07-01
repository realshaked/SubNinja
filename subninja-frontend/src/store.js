import { configureStore } from '@reduxjs/toolkit';
import assinaturaReducer from './componentes/assinaturas/assinaturaSlice';
import categoriasReducer from './componentes/categorias/categoriasSlice';
import notificacoesReducer from './componentes/notificacoes/notificacoesSlice';
import authReducer from './componentes/auth/authSlice';

export default configureStore({
  reducer: {
    assinaturas: assinaturaReducer,
    categorias: categoriasReducer,
    notificacoes: notificacoesReducer,
    auth: authReducer,
  },
});