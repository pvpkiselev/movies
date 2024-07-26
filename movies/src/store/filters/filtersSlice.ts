/* eslint-disable max-lines */
import { POPULAR_OPTION } from '@/components/filters/sortSelect/constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_ERROR_MESSAGE } from '@/api/constants';
import { fetchFavoriteMovieAction } from './model/fetchFavoriteMovieAction';
import { fetchFavoriteMoviesListAction } from './model/fetchFavoriteMoviesListAction';
import { fetchGenresDataAction } from './model/fetchGenresDataAction';
import { Genre } from '@/components/filters/genres/types/genres.types';
import { fetchMovieCreditsAction } from './model/fetchMovieCreditsAction';
import { fetchMovieDetailsAction } from './model/fetchMovieDetailsAction';
import { Movie } from '@/components/movieList/types/movies.types';
import { fetchSearchedMoviesAction } from './model/fetchSearchedMoviesAction';
import { fetchSortedMoviesAction } from './model/fetchSortedMoviesAction';

type Statuses = 'pending' | 'fulfilled' | 'rejected';

type FiltersState = {
  genres: Genre[];
  sortType: string;
  yearRange: number[];
  movies: Movie[];
  maxPages: number;
  favMovies: Movie[];
  favMoviesIds: number[];
  favMaxPages: number;
  currentPage: number;
  searchQuery: string;
  status: Statuses;
  error: string | null;
};

const initialSort = POPULAR_OPTION;
const initialYearRange = [1970, 2024];

const initialState: FiltersState = {
  genres: [],
  sortType: initialSort,
  yearRange: initialYearRange,
  movies: [],
  maxPages: 500,
  favMovies: [],
  favMaxPages: 1,
  favMoviesIds: [],
  currentPage: 1,
  searchQuery: '',
  status: 'fulfilled',
  error: null,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    toggledGenres(state, action: PayloadAction<number[]>) {
      const selectedGenresSet = new Set(action.payload);
      const updatedGenres = state.genres.map((genre) => ({
        ...genre,
        checked: selectedGenresSet.has(genre.id),
      }));
      return {
        ...state,
        genres: updatedGenres,
      };
    },
    changedSortType(state, action: PayloadAction<string>) {
      if (state.sortType !== action.payload) {
        state.sortType = action.payload;
        state.currentPage = 1;
      }
    },
    changedYearRange(state, action: PayloadAction<number[]>) {
      state.yearRange = action.payload;
      state.currentPage = 1;
    },
    pageSelected(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    changedSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
      state.currentPage = 1;
    },
    resetFilters(state) {
      return {
        ...initialState,
        movies: state.movies,
        favMovies: state.favMovies,
        favMoviesIds: state.favMoviesIds,
        genres: state.genres.map((genre) => {
          return { ...genre, checked: false };
        }),
      };
    },
  },
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

      .addCase(fetchGenresDataAction.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(fetchGenresDataAction.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        const genres = action.payload.genres.map((genre) => ({ ...genre, checked: false }));
        state.genres = genres;
      })
      .addCase(fetchGenresDataAction.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload?.message ?? DEFAULT_ERROR_MESSAGE;
      })

      .addCase(fetchMovieCreditsAction.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(fetchMovieCreditsAction.fulfilled, (state) => {
        state.status = 'fulfilled';
      })
      .addCase(fetchMovieCreditsAction.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload?.message ?? DEFAULT_ERROR_MESSAGE;
      })

      .addCase(fetchMovieDetailsAction.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(fetchMovieDetailsAction.fulfilled, (state) => {
        state.status = 'fulfilled';
      })
      .addCase(fetchMovieDetailsAction.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload?.message ?? DEFAULT_ERROR_MESSAGE;
      })

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
      });
  },
});

export const {
  toggledGenres,
  changedSortType,
  changedYearRange,
  pageSelected,
  changedSearchQuery,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
