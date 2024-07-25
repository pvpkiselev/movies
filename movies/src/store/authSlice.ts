import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  isAuth: boolean;
  email: string | null;
  token: string | null;
  userId: string | null;
};

type LoginTypeAction = {
  token: string;
  userId: string;
};

const initialState: AuthState = {
  isAuth: false,
  email: null,
  token: null,
  userId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginTypeAction>) {
      state.isAuth = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },
    logout(state) {
      state.isAuth = false;
      state.email = null;
      state.token = null;
      state.userId = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
