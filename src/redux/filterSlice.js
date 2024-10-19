import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: '',
  date: '',
} ;

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action) {
      return action.payload;
    },

    prepare: filterValue => {
      return {
        payload: filterValue,
      };
    },
  },
});

export const { setFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
