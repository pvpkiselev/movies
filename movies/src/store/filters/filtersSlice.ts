/* eslint-disable max-lines */
import { POPULAR_OPTION } from '@/components/filters/sortSelect/constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchFavoriteMovieAction } from './thunks/thunks';
import { DEFAULT_ERROR_MESSAGE } from '@/api/constants';

type Statuses = 'pending' | 'fulfilled' | 'rejected';

type FiltersState = {
  genreIds: number[];
  sortType: string;
  yearRange: number[];
  favMoviesIds: number[];
  currentPage: number;
  maxPages: number;
  searchQuery: string;
  status: Statuses;
  error: string | null;
};

const initialSort = POPULAR_OPTION;
const initialYearRange = [1970, 2024];

const initialState: FiltersState = {
  genreIds: [],
  sortType: initialSort,
  yearRange: initialYearRange,
  favMoviesIds: [],
  currentPage: 1,
  maxPages: 500,
  searchQuery: '',
  status: 'fulfilled',
  error: null,
};

// export const fetchFavoriteMovieAction = createAppAsyncThunk(
//   'filters/fetchFavoriteMovie',
//   async (
//     {
//       userId,
//       movieId,
//       isFavorite,
//     }: {
//       userId: string;
//       movieId: number;
//       isFavorite: boolean;
//     },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await api.filters.fetchFavoriteMovie(userId, movieId, isFavorite);
//       return { movieId, isFavorite };
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const fetchFavoriteMoviesListAction = createAppAsyncThunk(
//   'filters/fetchFavoriteMoviesList',
//   async (
//     { userId, currentPage }: { userId: string; currentPage?: number },
//     { rejectWithValue }
//   ) => {
//     try {
//       const data = await api.filters.getFavoriteMoviesList(userId, currentPage);
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const fetchGenresDataAction = createAppAsyncThunk(
//   'filters/fetchGenresData',
//   async (_, { rejectWithValue }) => {
//     try {
//       const data = await api.filters.getGenresData();
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const fetchMovieCreditsAction = createAppAsyncThunk(
//   'filters/fetchMovieCredits',
//   async (id: string, { rejectWithValue }) => {
//     try {
//       const data = await api.filters.getMovieCredits(id);
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const fetchMovieDetailsAction = createAppAsyncThunk(
//   'filters/fetchMovieDetails',
//   async (id: string, { rejectWithValue }) => {
//     try {
//       const data = await api.filters.getMovieDetails(id);
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const fetchSearchedMoviesAction = createAppAsyncThunk(
//   'filters/fetchSearchedMovies',
//   async ({ query, page }: { query: string; page: number }, { rejectWithValue }) => {
//     try {
//       const data = await api.filters.getSearchedMovies(query, page);
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const fetchSortedMoviesAction = createAppAsyncThunk(
//   'filters/fetchSortedMovies',
//   async (
//     props: {
//       currentPage: number;
//       minYear: number;
//       maxYear: number;
//       sortType: string;
//       genreIdsString: string;
//     },
//     { rejectWithValue }
//   ) => {
//     try {
//       const data = await api.filters.getSortedMovies(props);
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    toggledGenres(state, action: PayloadAction<number[]>) {
      state.genreIds = action.payload;
      state.currentPage = 1;
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
    changedMaxPages(state, action: PayloadAction<number>) {
      state.maxPages = action.payload;
    },
    pageSelected(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    loadedFavoriteMoviesIds(state, action: PayloadAction<number[]>) {
      state.favMoviesIds = action.payload;
    },
    toggledFavorite(state, action: PayloadAction<number>) {
      const favId = action.payload;
      state.favMoviesIds = state.favMoviesIds.includes(favId)
        ? state.favMoviesIds.filter((id) => id !== favId)
        : [...state.favMoviesIds, favId];
    },
    changedSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
      state.currentPage = 1;
    },
    resetFilters(state) {
      return { ...initialState, favMoviesIds: state.favMoviesIds };
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

        const favId = action.payload.movieId;
        state.favMoviesIds = state.favMoviesIds.includes(favId)
          ? state.favMoviesIds.filter((id) => id !== favId)
          : [...state.favMoviesIds, favId];
      })
      .addCase(fetchFavoriteMovieAction.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload?.message ?? DEFAULT_ERROR_MESSAGE;
      });
    // // Add thunks here
    // .addCase(fetchFavoriteMoviesListAction.pending, (state) => {
    //   state.status = 'pending';
    //   state.error = null;
    // })
    // .addCase(fetchFavoriteMoviesListAction.fulfilled, (state, action) => {
    //   state.status = 'fulfilled';
    //   // Update state with fetched favorite movies
    // })
    // .addCase(fetchFavoriteMoviesListAction.rejected, (state, action) => {
    //   state.status = 'rejected';
    //   state.error = action.payload as string;
    // })
    // .addCase(fetchGenresDataAction.pending, (state) => {
    //   state.status = 'pending';
    //   state.error = null;
    // })
    // .addCase(fetchGenresDataAction.fulfilled, (state, action) => {
    //   state.status = 'fulfilled';
    //   // Update state with fetched genres
    // })
    // .addCase(fetchGenresDataAction.rejected, (state, action) => {
    //   state.status = 'rejected';
    //   state.error = action.payload as string;
    // })
    // .addCase(fetchMovieCreditsAction.pending, (state) => {
    //   state.status = 'pending';
    //   state.error = null;
    // })
    // .addCase(fetchMovieCreditsAction.fulfilled, (state, action) => {
    //   state.status = 'fulfilled';
    //   // Update state with fetched movie credits
    // })
    // .addCase(fetchMovieCreditsAction.rejected, (state, action) => {
    //   state.status = 'rejected';
    //   state.error = action.payload as string;
    // })
    // .addCase(fetchMovieDetailsAction.pending, (state) => {
    //   state.status = 'pending';
    //   state.error = null;
    // })
    // .addCase(fetchMovieDetailsAction.fulfilled, (state, action) => {
    //   state.status = 'fulfilled';
    //   // Update state with fetched movie details
    // })
    // .addCase(fetchMovieDetailsAction.rejected, (state, action) => {
    //   state.status = 'rejected';
    //   state.error = action.payload as string;
    // })
    // .addCase(fetchSearchedMoviesAction.pending, (state) => {
    //   state.status = 'pending';
    //   state.error = null;
    // })
    // .addCase(fetchSearchedMoviesAction.fulfilled, (state, action) => {
    //   state.status = 'fulfilled';
    //   // Update state with searched movies
    // })
    // .addCase(fetchSearchedMoviesAction.rejected, (state, action) => {
    //   state.status = 'rejected';
    //   state.error = action.payload as string;
    // })
    // .addCase(fetchSortedMoviesAction.pending, (state) => {
    //   state.status = 'pending';
    //   state.error = null;
    // })
    // .addCase(fetchSortedMoviesAction.fulfilled, (state, action) => {
    //   state.status = 'fulfilled';
    //   // Update state with sorted movies
    // })
    // .addCase(fetchSortedMoviesAction.rejected, (state, action) => {
    //   state.status = 'rejected';
    //   state.error = action.payload as string;
    // });
  },
});

export const {
  toggledGenres,
  changedSortType,
  changedYearRange,
  changedMaxPages,
  pageSelected,
  loadedFavoriteMoviesIds,
  toggledFavorite,
  changedSearchQuery,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
