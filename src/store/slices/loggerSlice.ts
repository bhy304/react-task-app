import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { LogItem } from '../../types';

type loggerState = {
  logArray: LogItem[];
};

const initialState: loggerState = {
  logArray: [],
};

const loggerSlice = createSlice({
  name: 'logger',
  initialState,
  reducers: {
    addLog: (state, { payload }: PayloadAction<LogItem>) => {
      state.logArray.push(payload);
    },
  },
});

export const { addLog } = loggerSlice.actions;

export const loggerReducer = loggerSlice.reducer;
