import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  id: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (
      state,
      { payload }: PayloadAction<{ email: string; id: string }>
    ) => {
      state.email = payload.email;
      state.id = payload.id;
    },
    removeUser: (state) => {
      state.email = '';
      state.id = '';
    },
  },
});

export const userReducer = userSlice.reducer;

export const { setUser, removeUser } = userSlice.actions;
