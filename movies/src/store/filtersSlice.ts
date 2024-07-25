import { POPULAR_OPTION } from '@/components/filters/sortSelect/constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FiltersState = {
  genreIds: number[];
  sortType: string;
  yearRange: number[];
  favMoviesIds: number[];
  currentPage: number;
  maxPages: number;
  searchQuery: string;
  loading: boolean;
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
  loading: false,
  error: null,
};

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
