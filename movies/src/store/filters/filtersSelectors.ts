import { POSSIBLE_PAGES } from '@/components/filters/pagination/constants';
import { createAppSelector, AppState } from '../store';

const selectCurrentPage = (state: AppState) => state.filters.currentPage;
const selectMaxPages = (state: AppState) => state.filters.maxPages;
const selectSortType = (state: AppState) => state.filters.sortType;
const selectSearchQuery = (state: AppState) => state.filters.searchQuery;
const selectYearRange = (state: AppState) => state.filters.yearRange;
const selectGenreIds = (state: AppState) => state.filters.genreIds;
const selectFavMoviesIds = (state: AppState) => state.filters.favMoviesIds;

const selectMoviesValues = createAppSelector(
  [selectCurrentPage, selectSortType, selectSearchQuery, selectYearRange, selectGenreIds],
  (currentPage, sortType, searchQuery, yearRange, genreIds) => ({
    currentPage,
    sortType,
    searchQuery,
    yearRange,
    genreIdsString: genreIds.join(','),
  })
);

const selectGenresValues = createAppSelector(
  [selectSortType, selectSearchQuery, selectGenreIds],
  (sortType, searchQuery, genreIds) => ({
    sortType,
    searchQuery,
    genreIds,
  })
);

const selectPaginationValues = createAppSelector(
  [selectCurrentPage, selectMaxPages],
  (currentPage, maxPages) => ({
    currentPage,
    totalPages: Math.min(maxPages, POSSIBLE_PAGES),
  })
);

const selectSortAndSearchValues = createAppSelector(
  [selectSortType, selectSearchQuery],
  (sortType, searchQuery) => ({
    sortType,
    searchQuery,
  })
);

export {
  selectMoviesValues,
  selectGenresValues,
  selectPaginationValues,
  selectSortAndSearchValues,
  selectSortType,
  selectFavMoviesIds,
};
