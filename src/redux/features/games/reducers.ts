import { addCaseToBuilderForStatus } from '@/redux/utils/reducers';
import { ActionReducerMapBuilder, CaseReducer, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { GamesResponse, GamesState } from './models';

const setGameId: CaseReducer<GamesState, PayloadAction<string>> = (state, action) => {
  return {
    ...state,
    activeGameId: action.payload,
  };
};

const setGameSearchTerms: CaseReducer<GamesState, PayloadAction<string>> = (state, action) => {
  return {
    ...state,
    searchTerms: action.payload,
  };
};

const reducers = {
  setGameId,
  setGameSearchTerms,
};

const getGames = createAsyncThunk('game/get', async () => {
  const response = await axios.get<GamesResponse>('/games');
  return response.data;
});

const extraReducers = (builder: ActionReducerMapBuilder<GamesState>) => {
  addCaseToBuilderForStatus(builder, getGames, (state, action) => {
    state.games = action.payload;
  });
};

export { reducers, extraReducers, getGames };
