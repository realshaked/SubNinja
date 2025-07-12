import { createSlice } from '@reduxjs/toolkit';
import { login, register, logout as logoutThunk, checkAuth, refreshToken, atualizarUsuario } from './authThunks';

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  status: 'idle', // Para login e operações gerais
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Logout síncrono (mantido para compatibilidade)
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem('token');
    },
    // Limpar erros
    clearError(state) {
      state.error = null;
    },
    // Reset status
    resetStatus(state) {
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.user = action.payload.user || action.payload; // Flexibilidade na estrutura da resposta
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
      })
      
      // Registro
      .addCase(register.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        
        // Se o registro retornar token, autentica automaticamente
        if (action.payload.token) {
          state.token = action.payload.token;
          state.user = action.payload.user || action.payload;
          state.isAuthenticated = true;
        } else {
          // Se não retornar token, apenas indica sucesso
          state.isAuthenticated = false;
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
      })
      
      // Logout assíncrono
      .addCase(logoutThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.status = 'idle';
        state.error = null;
      })
      .addCase(logoutThunk.rejected, (state) => {
        // Mesmo com erro, limpa o estado local
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.status = 'idle';
        state.error = null;
      })
      
      // Verificação de autenticação
      .addCase(checkAuth.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user || action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
      })
      // Atualização de usuário
      .addCase(atualizarUsuario.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(atualizarUsuario.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = { ...state.user, ...action.payload };
        state.error = null;
      })
      .addCase(atualizarUsuario.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
            
      // Refresh token
      .addCase(refreshToken.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.user = action.payload.user || state.user; // Mantém usuário existente se não vier na resposta
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
      });
      
  },
});

export const { logout, clearError, resetStatus } = authSlice.actions;
export default authSlice.reducer;