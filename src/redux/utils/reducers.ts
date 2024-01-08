import { ActionReducerMapBuilder, CaseReducer, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

export type AsyncStatus = {
  status?: 'loading' | 'succeeded' | 'fail';
  error?: string;
};

type FullfilledMeta<P> = {
  arg: P;
  requestId: string;
  requestStatus: 'fulfilled';
};

export const addCaseToBuilderForStatus = <State extends AsyncStatus, Return, Payload>(
  builder: ActionReducerMapBuilder<State>,
  thunk: ReturnType<typeof createAsyncThunk<Return, Payload>>,
  onFullfilledExtra?: CaseReducer<State, PayloadAction<Return, string, FullfilledMeta<Payload>, never>>,
) => {
  return builder
    .addCase(thunk.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(thunk.fulfilled, (state, action) => {
      state.status = 'succeeded';
      onFullfilledExtra && onFullfilledExtra(state, action);
    })
    .addCase(thunk.rejected, (state, action) => {
      state.status = 'fail';
      state.error = (action.payload as AsyncStatus)?.error || action.error?.message;
    });
};
