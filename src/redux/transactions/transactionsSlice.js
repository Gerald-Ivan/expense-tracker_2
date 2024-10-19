import { createSlice } from '@reduxjs/toolkit';
import {
  addTransaction,
  deleteTransaction,
  fetchExpenses,
  fetchIncomes,
  updateTransaction,
} from './operations';
import { Notify } from 'notiflix';

const initialState = {
  transactions: {
    expenses: [],
    incomes: [],
  },
  isLoading: false,
  error: null,
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchExpenses.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions.expenses = action.payload;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(fetchIncomes.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchIncomes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions.incomes = action.payload;
      })
      .addCase(fetchIncomes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(addTransaction.pending, state => {
        state.isLoading = true;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        const { type } = action.payload;
        state.isLoading = false;
        state.transactions[type].push(action.payload);
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateTransaction.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        const { type } = action.payload;
        state.transactions = {
          ...state.transactions,
          [type]: state.transactions[type]?.map(e => e._id === action.payload._id ?
            { ...e, ...action.payload } : e),
        };
        Notify.success('Transaction saved successfully!');
      })
      .addCase(updateTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        Notify.failure('Failed to update transaction!');
      })
      .addCase(deleteTransaction.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        const { type, _id } = action.payload;
        state.transactions = {
          ...state.transactions,
          [type]: state.transactions[type]?.filter(e => e._id !== _id),
        };
        Notify.success('Transaction deleted successfully!');
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        Notify.failure('Failed to delete transaction!');
      });
  },
});

export const transactionsReducer = transactionsSlice.reducer;
