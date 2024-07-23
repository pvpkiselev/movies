import { combineReducers, createSelector, createStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/authReducer';
import { filtersReducer } from './filters/filtersReducer';
import { useDispatch, useSelector } from 'react-redux';

const moviesApp = combineReducers({
  auth: authReducer,
  filters: filtersReducer,
});

const store = createStore(moviesApp);

export type MoviesAppState = ReturnType<typeof store.getState>;
export type MoviesAppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<MoviesAppState>();
export const useAppDispatch = useDispatch.withTypes<MoviesAppDispatch>();
export const createAppSelector = createSelector.withTypes<MoviesAppState>();

export default store;
