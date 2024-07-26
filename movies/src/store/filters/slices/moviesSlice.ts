import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '@/components/movieList/types/movies.types';
import { fetchSearchedMoviesAction } from '../actions/thunks/fetchSearchedMoviesAction';
import { fetchSortedMoviesAction } from '../actions/thunks/fetchSortedMoviesAction';
import { DEFAULT_ERROR_MESSAGE } from '@/api/constants';
import { resetFiltersAction } from '../actions/resetFiltersAction';

type MoviesState = {
  movies: Movie[];
  maxPages: number;
  currentPage: number;
  searchQuery: string;
  status: 'pending' | 'fulfilled' | 'rejected';
  error: string | null;
};

const initialState: MoviesState = {
  movies: [],
  maxPages: 500,
  currentPage: 1,
  searchQuery: '',
  status: 'fulfilled',
  error: null,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    pageSelected(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    changedSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchedMoviesAction.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(fetchSearchedMoviesAction.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.movies = action.payload.movies.results;
        state.maxPages = action.payload.movies.total_pages;
      })
      .addCase(fetchSearchedMoviesAction.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload?.message ?? DEFAULT_ERROR_MESSAGE;
      })
      .addCase(fetchSortedMoviesAction.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(fetchSortedMoviesAction.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.movies = action.payload.movies.results;
        state.maxPages = action.payload.movies.total_pages;
      })
      .addCase(fetchSortedMoviesAction.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload?.message ?? DEFAULT_ERROR_MESSAGE;
      })
      .addCase(resetFiltersAction, (state) => {
        return {
          ...initialState,
          movies: state.movies,
        };
      });
  },
});

export const { pageSelected, changedSearchQuery } = moviesSlice.actions;
const moviesReducer = moviesSlice.reducer;
export default moviesReducer;
