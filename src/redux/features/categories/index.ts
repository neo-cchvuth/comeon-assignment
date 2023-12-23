import { createSlice } from '@reduxjs/toolkit';

import { CategoriesState } from './models';
import { extraReducers, reducers } from './reducers';

const initialState: CategoriesState = {
  categories: [],
  selectedId: 0,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers,
  extraReducers,
});

export const { setCategoryId } = categorySlice.actions;
export default categorySlice.reducer;
