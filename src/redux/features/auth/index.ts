import { createSlice } from '@reduxjs/toolkit';

import { AuthState } from './models';
import { extraReducers, reducers } from './reducers';

const initialState: AuthState = {
  username: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers,
  extraReducers,
});

export const { setUsername } = authSlice.actions;
export default authSlice.reducer;
