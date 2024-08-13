import { createSlice } from '@reduxjs/toolkit';

import { Movie } from '@/components/movieList/types/movies.types';
import { fetchFavoriteMoviesListAction } from '../actions/thunks/fetchFavoriteMoviesListAction';
import { resetFiltersAction } from '../actions/resetFiltersAction';

type FavoriteMoviesState = {
  favMovies: Movie[];
  favMoviesIds: number[];
  favMaxPages: number;
  status: 'pending' | 'fulfilled' | 'rejected';
};

const initialState: FavoriteMoviesState = {
  favMovies: [],
  favMoviesIds: [],
  favMaxPages: 1,
  status: 'fulfilled',
};

const favoriteMoviesSlice = createSlice({
  name: 'favoriteMovies',
  initialState,
  reducers: {
    toggledFavMovie(state, action) {
      const movieId = action.payload;
      if (state.favMoviesIds.includes(movieId)) {
        state.favMoviesIds = state.favMoviesIds.filter((id) => id !== movieId);
      } else {
        state.favMoviesIds.push(movieId);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoriteMoviesListAction.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchFavoriteMoviesListAction.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        const favIds = action.payload.results.map((movie) => movie.id);
        state.favMoviesIds = favIds;
        state.favMovies = action.payload.results;
        state.favMaxPages = action.payload.total_pages;
      })
      .addCase(fetchFavoriteMoviesListAction.rejected, (state) => {
        state.status = 'rejected';
      })
      .addCase(resetFiltersAction, (state) => {
        return {
          ...initialState,
          favMovies: state.favMovies,
          favMoviesIds: state.favMoviesIds,
        };
      });
  },
});

export const { toggledFavMovie } = favoriteMoviesSlice.actions;
const favMoviesReducer = favoriteMoviesSlice.reducer;
export default favMoviesReducer;
