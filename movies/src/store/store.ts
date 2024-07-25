import { configureStore, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import filtersReducer from './filtersSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    filters: filtersReducer,
    auth: authReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const createAppSelector = createSelector.withTypes<AppState>();
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppState;
  dispatch: AppDispatch;
}>();

export default store;
