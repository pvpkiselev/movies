import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import api from '@/api/api';
import yearRangeReducer from './filters/slices/yearRangeSlice';
import sortReducer from './filters/slices/sortSlice';
import genresReducer from './filters/slices/genresSlice';
import moviesReducer from './filters/slices/moviesSlice';
import favMoviesReducer from './filters/slices/favMoviesSlice';

export const extraArgument = {
  api,
};

const filtersReducer = combineReducers({
  genresSlice: genresReducer,
  sortSlice: sortReducer,
  yearRangeSlice: yearRangeReducer,
  moviesSlice: moviesReducer,
  favMoviesSlice: favMoviesReducer,
});

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: { extraArgument } }),
});
