import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://expense-tracker.b.goit.study/api';

export const fetchExpenses = createAsyncThunk(
  'transactions/fetchExpenses',
  async (data, thunkAPI) => {
    try {
      const date = data?.date ? `?date=${data.date}` : '';
      const response = await axios.get(`/transactions/expenses${date}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);


export const fetchIncomes = createAsyncThunk(
  'transactions/fetchIncomes',
  async (data, thunkAPI) => {
    try {
      const date = data?.date ? `?date=${data.date}` : '';
      const response = await axios.get(`/transactions/incomes${date}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const addTransaction = createAsyncThunk(
  'transactions/addTransaction',
  async (data, thunkAPI) => {
    try {
      const response = await axios.post('/transactions', data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const deleteTransaction = createAsyncThunk(
  'transactions/deleteTransaction',
  async ({ type, _id }, thunkAPI) => {
    try {
      await axios.delete(`/transactions/${_id}`);
      return { type, _id };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);


export const updateTransaction = createAsyncThunk(
  'transactions/updateTransaction',
  async (data, thunkAPI) => {
    try {
      const response = await axios
        .patch(`/transactions/${data.type}/${data._id}`, {
          date: data.date,
          time: data.time,
          category: data.category._id,
          sum: data.sum,
          comment: data.comment,
        });
      return { ...response.data, _id: data._id, type: data.type };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
