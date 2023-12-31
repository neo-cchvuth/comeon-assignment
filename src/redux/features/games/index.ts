import { createSlice } from '@reduxjs/toolkit';

import { GamesState } from './models';
import { extraReducers, reducers } from './reducers';

const initialState: GamesState = {
  games: [],
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers,
  extraReducers,
});

export default categorySlice.reducer;
