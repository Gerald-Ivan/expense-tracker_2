import { createSlice } from '@reduxjs/toolkit';
import { addCategory, deleteCategory, fetchCategories, updateCategory } from './operations';
import { Notify } from 'notiflix';

const initialState = {
  categories: {
    expenses: [],
    incomes: [],
  },
  isLoading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addCategory.pending, state => {
        state.isLoading = true;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        const { type } = action.payload;
        state.isLoading = false;
        state.categories[type] = [...state.categories[type] || []];
        state.categories[type].push(action.payload);
        Notify.success('Category added successfully!');
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateCategory.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;

        state.categories = {
          expenses: state.categories.expenses?.map(e => e._id === action.payload._id ?
            { ...e, ...action.payload } : e),
          incomes: state.categories.incomes?.map(e => e._id === action.payload._id ?
            { ...e, ...action.payload } : e),
        };
        Notify.success('Category saved successfully!');
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        Notify.failure('Failed to update category!');
      })
      .addCase(deleteCategory.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;

        state.categories = {
          expenses: state.categories.expenses?.filter(e => e._id !== action.payload),
          incomes: state.categories.incomes?.filter(e => e._id !== action.payload),
        };
        Notify.success('Category deleted successfully!');
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        Notify.failure('Failed to delete category!');
      });
  },
});

export const categoriesReducer = categoriesSlice.reducer;
