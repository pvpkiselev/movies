import { createSlice } from '@reduxjs/toolkit';
import { Movie } from '@/components/movieList/types/movies.types';
import { fetchFavoriteMovieAction } from '../actions/thunks/fetchFavoriteMovieAction';
import { fetchFavoriteMoviesListAction } from '../actions/thunks/fetchFavoriteMoviesListAction';
import { DEFAULT_ERROR_MESSAGE } from '@/api/constants';
import { resetFiltersAction } from '../actions/resetFiltersAction';

type FavoriteMoviesState = {
  favMovies: Movie[];
  favMoviesIds: number[];
  favMaxPages: number;
  status: 'pending' | 'fulfilled' | 'rejected';
  error: string | null;
};

const initialState: FavoriteMoviesState = {
  favMovies: [],
  favMoviesIds: [],
  favMaxPages: 1,
  status: 'fulfilled',
  error: null,
};

const favoriteMoviesSlice = createSlice({
  name: 'favoriteMovies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoriteMovieAction.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(fetchFavoriteMovieAction.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        const { movieId } = action.payload;
        if (state.favMoviesIds.includes(movieId)) {
          state.favMoviesIds = state.favMoviesIds.filter((id) => id !== movieId);
        } else {
          state.favMoviesIds.push(movieId);
        }
      })
      .addCase(fetchFavoriteMovieAction.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload?.message ?? DEFAULT_ERROR_MESSAGE;
      })
      .addCase(fetchFavoriteMoviesListAction.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(fetchFavoriteMoviesListAction.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        const favIds = action.payload.movies.results.map((movie) => movie.id);
        state.favMoviesIds = favIds;
        state.favMovies = action.payload.movies.results;
        state.favMaxPages = action.payload.movies.total_pages;
      })
      .addCase(fetchFavoriteMoviesListAction.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload?.message ?? DEFAULT_ERROR_MESSAGE;
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

const favMoviesReducer = favoriteMoviesSlice.reducer;
export default favMoviesReducer;
