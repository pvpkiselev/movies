import { POSSIBLE_PAGES } from '@/components/filters/pagination/constants';
import { createAppSelector, MoviesAppState } from '../store';

const selectCurrentPage = (state: MoviesAppState) => state.filters.currentPage;
const selectMaxPages = (state: MoviesAppState) => state.filters.maxPages;
const selectSortType = (state: MoviesAppState) => state.filters.sortType;
const selectSearchQuery = (state: MoviesAppState) => state.filters.searchQuery;
const selectYearRange = (state: MoviesAppState) => state.filters.yearRange;
const selectGenreIds = (state: MoviesAppState) => state.filters.genreIds;
const selectFavMoviesIds = (state: MoviesAppState) => state.filters.favMoviesIds;

const selectGenreIdsString = createAppSelector([selectGenreIds], (genreIds) => genreIds.join(','));
const selectTotalPages = createAppSelector([selectMaxPages], (maxPages) =>
  Math.min(maxPages, POSSIBLE_PAGES)
);

export {
  selectCurrentPage,
  selectSortType,
  selectSearchQuery,
  selectYearRange,
  selectGenreIds,
  selectFavMoviesIds,
  selectGenreIdsString,
  selectTotalPages,
};
