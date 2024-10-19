import { createSlice } from '@reduxjs/toolkit';
import {
  fetchCurrentUser,
  updateUser,
  changeAvatar,
  removeAvatar,
} from './operations';
import { Notify } from 'notiflix';

const initialState = {
  user: {},
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchCurrentUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(updateUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
        state.isLoading = false;
        Notify.success('Profile updated successfully!');
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        Notify.failure('Profile update failed.');
      })

      .addCase(changeAvatar.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(changeAvatar.fulfilled, (state, action) => {
        state.user = {
          ...state.user,
          avatarUrl: action.payload?.avatarUrl,
        };
        state.isLoading = false;
        Notify.success('Avatar updated successfully!');
      })
      .addCase(changeAvatar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        Notify.failure('Failed to update avatar!');
      })

      .addCase(removeAvatar.pending, state => {
        state.isLoading = true;
        state.error = null;
        Notify.success('Avatar has been removed');
      })
      .addCase(removeAvatar.fulfilled, state => {
        state.user.avatarUrl = null;
        state.isLoading = false;
      })
      .addCase(removeAvatar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        Notify.failure('Unable to remove avatar! Please try again.');
      });
  },
});

export const userReducer = userSlice.reducer;
