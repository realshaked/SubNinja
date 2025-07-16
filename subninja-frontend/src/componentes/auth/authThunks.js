import { createAsyncThunk } from '@reduxjs/toolkit';

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, senha }, { rejectWithValue }) => {
    try {
      const res = await fetch('/auth/login-jwt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, senha }),
      });
      
      if (!res.ok) {
        const error = await res.json();
        return rejectWithValue(error.error || 'Erro ao fazer login');
      }
      
      const data = await res.json();
      sessionStorage.setItem('token', data.token);
      return data;
    } catch (err) {
      return rejectWithValue('Erro de conexão');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ username, senha, email, telefone, role = 'user' }, { rejectWithValue }) => {
    try {
      const res = await fetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, senha, email, telefone, role }),
      });
      
      if (!res.ok) {
        const error = await res.json();
        return rejectWithValue(error.error || 'Erro ao criar conta');
      }
      
      const data = await res.json();
      
      if (data.token) {
        sessionStorage.setItem('token', data.token);
      }
      
      return data;
    } catch (err) {
      return rejectWithValue('Erro de conexão');
    }
  }
);


export const atualizarUsuario = createAsyncThunk(
  'auth/atualizarUsuario',
  async (dadosUsuario, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem('token');
      const resposta = await fetch('/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dadosUsuario),
      });
      
      if (!resposta.ok) {
        const erro = await resposta.json();
        return rejectWithValue(erro.error || 'Erro ao atualizar perfil');
      }
      
      const dados = await resposta.json();
      return dados;
    } catch (erro) {
      return rejectWithValue('Erro de conexão ao atualizar perfil');
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      sessionStorage.removeItem('token');
      
      const token = sessionStorage.getItem('token');
      if (token) {
        await fetch('/auth/logout', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
      }
      
      return null;
    } catch (err) {
      sessionStorage.removeItem('token');
      return null;
    }
  }
);

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem('token');
      
      if (!token) {
        return rejectWithValue('Token não encontrado');
      }
      
      const res = await fetch('/auth/verify-token', {
        method: 'GET',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      
      if (!res.ok) {
        sessionStorage.removeItem('token');
        return rejectWithValue('Token inválido');
      }
      
      const data = await res.json();
      return data;
    } catch (err) {
      sessionStorage.removeItem('token');
      return rejectWithValue('Erro ao verificar autenticação');
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem('token');
      
      if (!token) {
        return rejectWithValue('Token não encontrado');
      }
      
      const res = await fetch('/auth/refresh-token', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      
      if (!res.ok) {
        sessionStorage.removeItem('token');
        return rejectWithValue('Erro ao renovar token');
      }
      
      const data = await res.json();
      sessionStorage.setItem('token', data.token);
      return data;
    } catch (err) {
      sessionStorage.removeItem('token');
      return rejectWithValue('Erro de conexão ao renovar token');
    }
  }
);
