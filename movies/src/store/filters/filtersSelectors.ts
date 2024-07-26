import { POSSIBLE_PAGES } from '@/components/filters/pagination/constants';
import { AppState, createAppSelector } from '../redux';

const selectMovies = (state: AppState) => state.filters.movies;
const selectFavMovies = (state: AppState) => state.filters.favMovies;
const selectCurrentPage = (state: AppState) => state.filters.currentPage;
const selectGenres = (state: AppState) => state.filters.genres;
const selectMaxPages = (state: AppState) => state.filters.maxPages;
const selectFavMaxPages = (state: AppState) => state.filters.favMaxPages;
const selectSortType = (state: AppState) => state.filters.sortType;
const selectSearchQuery = (state: AppState) => state.filters.searchQuery;
const selectYearRange = (state: AppState) => state.filters.yearRange;
const selectFavMoviesIds = (state: AppState) => state.filters.favMoviesIds;

const selectGenreIds = createAppSelector([selectGenres], (genres) =>
  genres.map((genre) => genre.id)
);

const selectCheckedGenres = createAppSelector([selectGenres], (genres) =>
  genres.filter((genre) => genre.checked).map((genre) => genre.id)
);

const selectMoviesValues = createAppSelector(
  [
    selectMovies,
    selectFavMovies,
    selectCurrentPage,
    selectSortType,
    selectSearchQuery,
    selectYearRange,
    selectCheckedGenres,
  ],
  (movies, favMovies, currentPage, sortType, searchQuery, yearRange, genreIds) => ({
    movies,
    favMovies,
    currentPage,
    sortType,
    searchQuery,
    yearRange,
    genreIdsString: genreIds.join(','),
  })
);

const selectGenresValues = createAppSelector(
  [selectSortType, selectSearchQuery, selectGenres, selectGenreIds, selectCheckedGenres],
  (sortType, searchQuery, genres, genreIds, checkedGenres) => ({
    sortType,
    searchQuery,
    genres,
    genreIds,
    checkedGenres,
  })
);

const selectPaginationValues = createAppSelector(
  [selectCurrentPage, selectSortType, selectMaxPages, selectFavMaxPages],
  (currentPage, sortType, maxPages, favMaxPages) => ({
    currentPage,
    sortType,
    maxPages: Math.min(maxPages, POSSIBLE_PAGES),
    favMaxPages: Math.min(favMaxPages, POSSIBLE_PAGES),
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
  selectGenres,
  selectSortType,
  selectFavMoviesIds,
};
