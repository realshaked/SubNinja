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
      localStorage.setItem('token', data.token);
      return data; // Retorna o objeto completo com user e token
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
      
      // Se o registro retornar um token, salva no localStorage
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      
      return data; // Retorna os dados do usuário registrado
    } catch (err) {
      return rejectWithValue('Erro de conexão');
    }
  }
);


export const atualizarUsuario = createAsyncThunk(
  'auth/atualizarUsuario',
  async (dadosUsuario, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
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
      // Remove o token do localStorage
      localStorage.removeItem('token');
      
      // Opcional: chamar endpoint de logout no servidor
      const token = localStorage.getItem('token');
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
      // Mesmo se houver erro no servidor, remove o token localmente
      localStorage.removeItem('token');
      return null;
    }
  }
);

// Thunk para verificar se o usuário está autenticado (validar token)
export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      
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
        localStorage.removeItem('token'); // Remove token inválido
        return rejectWithValue('Token inválido');
      }
      
      const data = await res.json();
      return data; // Retorna dados do usuário
    } catch (err) {
      localStorage.removeItem('token');
      return rejectWithValue('Erro ao verificar autenticação');
    }
  }
);

// Thunk para refresh do token (se necessário)
export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      
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
        localStorage.removeItem('token');
        return rejectWithValue('Erro ao renovar token');
      }
      
      const data = await res.json();
      localStorage.setItem('token', data.token);
      return data;
    } catch (err) {
      localStorage.removeItem('token');
      return rejectWithValue('Erro de conexão ao renovar token');
    }
  }
);
