import { createSlice } from '@reduxjs/toolkit';
import { login, register, logout as logoutThunk, checkAuth, refreshToken, atualizarUsuario } from './authThunks';

const initialState = {
  user: null,
  token: sessionStorage.getItem('token') || null,
  isAuthenticated: !!sessionStorage.getItem('token'),
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.status = 'idle';
      state.error = null;
      sessionStorage.removeItem('token');
    },
    clearError(state) {
      state.error = null;
    },
    resetStatus(state) {
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.user = action.payload.user || action.payload;
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
      
      .addCase(register.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        
        if (action.payload.token) {
          state.token = action.payload.token;
          state.user = action.payload.user || action.payload;
          state.isAuthenticated = true;
        } else {
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
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.status = 'idle';
        state.error = null;
      })
      
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
            
      .addCase(refreshToken.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.user = action.payload.user || state.user; 
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