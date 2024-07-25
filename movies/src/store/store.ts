import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './filters/filtersSlice';
import authReducer from './auth/authSlice';
import api from '@/api/api';

export const extraArgument = {
  api,
};

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: { extraArgument } }),
});
