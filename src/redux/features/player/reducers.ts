import { addCaseToBuilderForStatus } from '@/redux/utils/reducers';
import { ActionReducerMapBuilder, CaseReducer, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { PlayerResponse, PlayerState } from './models';

const setPlayer: CaseReducer<PlayerState, PayloadAction<PlayerState>> = (state, action) => {
  return {
    ...state,
    ...action.payload,
  };
};

const reducers = {
  setPlayer,
};

const getPlayer = createAsyncThunk('player/me', async () => {
  const response = await axios.get<PlayerResponse>('/me');
  return response.data;
});

const extraReducers = (builder: ActionReducerMapBuilder<PlayerState>) => {
  addCaseToBuilderForStatus(builder, getPlayer, (state, action) => {
    state.player = action.payload.player;
  });
};

export { reducers, extraReducers, getPlayer };
