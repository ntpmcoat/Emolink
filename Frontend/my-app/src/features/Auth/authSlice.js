// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
  },
  reducers: {
    authenticateUser: (state) => {
      state.isAuthenticated = true;
    },
    unauthenticateUser: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { authenticateUser, unauthenticateUser } = authSlice.actions;
export default authSlice.reducer;
