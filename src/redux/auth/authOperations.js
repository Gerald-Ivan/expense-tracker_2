import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://expense-tracker.b.goit.study/api';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, thunkAPI) => {
    try {
      await axios.post('/auth/register', { name, email, password });
      const loginResponse = await thunkAPI.dispatch(logIn({ email, password }));
      return loginResponse.payload;
    } catch (error) {
      const status = error.response.status;
      const { message } = error.response?.data;
      return thunkAPI.rejectWithValue({ status, message });
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await axios.post('/auth/login', { email, password });
      const { accessToken, refreshToken, sid, user } = res.data;
      setAuthHeader(accessToken);
      return { user, accessToken, refreshToken, sid };
    } catch (error) {
      const status = error.response.status;
      const { message } = error.response?.data;
      return thunkAPI.rejectWithValue({ status, message });
    }
  }
);

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.get('/auth/logout');
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshToken = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedRefreshToken = state.auth.refreshToken;
    const sid = state.auth.sid;

    if (!persistedRefreshToken || !sid) {
      return thunkAPI.rejectWithValue(
        'Unable to refresh token: Missing token or SID'
      );
    }

    try {
      setAuthHeader(persistedRefreshToken);
      const res = await axios.post('/auth/refresh', { sid });

      const {
        accessToken,
        refreshToken: newRefreshToken,
        sid: newSid,
      } = res.data;

      setAuthHeader(accessToken);

      return { accessToken, refreshToken: newRefreshToken, sid: newSid };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
