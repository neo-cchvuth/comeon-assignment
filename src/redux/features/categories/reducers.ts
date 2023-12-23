import { addCaseToBuilderForStatus } from '@/redux/utils/reducers';
import { ActionReducerMapBuilder, CaseReducer, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { CategoriesResponse, CategoriesState } from './models';

const setCategoryId: CaseReducer<CategoriesState, PayloadAction<number>> = (state, action) => {
  return {
    ...state,
    selectedId: action.payload,
  };
};

const reducers = {
  setCategoryId,
};

const getCategories = createAsyncThunk('category/get', async () => {
  const response = await axios.get<CategoriesResponse>('/categories');
  return response.data;
});

const extraReducers = (builder: ActionReducerMapBuilder<CategoriesState>) => {
  addCaseToBuilderForStatus(builder, getCategories, (state, action) => {
    state.categories = action.payload;
  });
};

export { reducers, extraReducers, getCategories };
