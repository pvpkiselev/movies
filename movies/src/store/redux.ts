import { useDispatch, useSelector } from 'react-redux';
import { createAsyncThunk, createSelector, ThunkAction, UnknownAction } from '@reduxjs/toolkit';
import type { extraArgument, store } from './store';

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<R = void> = ThunkAction<R, AppState, typeof extraArgument, UnknownAction>;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const createAppSelector = createSelector.withTypes<AppState>();
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppState;
  dispatch: AppDispatch;
  extra: typeof extraArgument;
}>();
