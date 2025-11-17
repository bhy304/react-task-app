import { createSlice } from '@reduxjs/toolkit';
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
  reducers: {},
});

export const loggerReducer = loggerSlice.reducer;
