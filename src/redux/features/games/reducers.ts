import { addCaseToBuilderForStatus } from '@/redux/utils/reducers';
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { GamesResponse, GamesState } from './models';

const reducers = {};

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
