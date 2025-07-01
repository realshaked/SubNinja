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
      return data.token;
    } catch (err) {
      return rejectWithValue('Erro de conexão');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
    async ({ username, senha, role }, { rejectWithValue }) => {
        try {
        const res = await fetch('/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, senha, role }),
        });
        if (!res.ok) {
            const error = await res.json();
            return rejectWithValue(error.error || 'Erro ao criar conta');
        }
        return await res.json();
        } catch (err) {
        return rejectWithValue('Erro de conexão');
        }
    }
);