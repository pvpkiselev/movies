import { POSSIBLE_PAGES } from '@/components/filters/pagination/constants';
import { createAppSelector, MoviesAppState } from '../store';

const selectCurrentPage = (state: MoviesAppState) => state.filters.currentPage;
const selectMaxPages = (state: MoviesAppState) => state.filters.maxPages;
const selectSortType = (state: MoviesAppState) => state.filters.sortType;
const selectSearchQuery = (state: MoviesAppState) => state.filters.searchQuery;
const selectYearRange = (state: MoviesAppState) => state.filters.yearRange;
const selectGenreIds = (state: MoviesAppState) => state.filters.genreIds;
const selectFavMoviesIds = (state: MoviesAppState) => state.filters.favMoviesIds;

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
