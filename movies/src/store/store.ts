import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import api from '@/api/api';
import yearRangeReducer from './filters/slices/yearRangeSlice';
import sortReducer from './filters/slices/sortSlice';
import genresReducer from './filters/slices/genresSlice';
import moviesReducer from './filters/slices/moviesSlice';
import favMoviesReducer from './filters/slices/favMoviesSlice';
import movieDetailsReducer from './filters/slices/movieDetailsSlice';

export const extraArgument = {
  api,
};

const filtersReducer = combineReducers({
  genresSlice: genresReducer,
  sortSlice: sortReducer,
  yearRangeSlice: yearRangeReducer,
  moviesSlice: moviesReducer,
  favMoviesSlice: favMoviesReducer,
  movieDetailsSlice: movieDetailsReducer,
});

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: { extraArgument } }),
});
