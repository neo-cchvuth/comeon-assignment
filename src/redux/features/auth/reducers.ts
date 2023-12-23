import { BaseResponse } from '@/axios';
import { addCaseToBuilderForStatus } from '@/redux/utils/reducers';
import { ActionReducerMapBuilder, CaseReducer, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { setPlayer } from '../player';
import { AuthState, LoginPayload, LoginResponse } from './models';

const setUsername: CaseReducer<AuthState, PayloadAction<string>> = (state, action) => {
  return {
    ...state,
    username: action.payload,
  };
};

const reducers = {
  setUsername,
};

const postLogin = createAsyncThunk('auth/login', async (data: LoginPayload, { dispatch, rejectWithValue }) => {
  try {
    const response = await axios.post<LoginResponse>('/login', data);
    document.cookie = `username=${data.username}; SameSite=Strict; Secure;`;
    dispatch(setPlayer(response.data.player));
    return response.data;
  } catch (e: any) {
    return rejectWithValue(e.response.data);
  }
});

const postLogout = createAsyncThunk('auth/logout', async (username: string, { dispatch }) => {
  const response = await axios.post<BaseResponse>('/logout', { username });
  document.cookie = 'username=; Max-Age=-99999999;';
  dispatch(setPlayer({}));
  return response.data;
});

const extraReducers = (builder: ActionReducerMapBuilder<AuthState>) => {
  addCaseToBuilderForStatus(builder, postLogin, (state, action) => {
    state.username = action.meta.arg.username;
    state.error = undefined;
  });
  addCaseToBuilderForStatus(builder, postLogout, (state) => {
    state.username = null;
  });
};

export { reducers, extraReducers, postLogin, postLogout };
