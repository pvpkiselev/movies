import { POSSIBLE_PAGES } from '@/components/filters/pagination/constants';
import { AppState, createAppSelector } from '@/store/redux';

const selectMovies = (state: AppState) => state.filters.moviesSlice.movies;
const selectFavMovies = (state: AppState) => state.filters.favMoviesSlice.favMovies;
const selectCurrentPage = (state: AppState) => state.filters.moviesSlice.currentPage;
const selectGenres = (state: AppState) => state.filters.genresSlice.genres;
const selectMaxPages = (state: AppState) => state.filters.moviesSlice.maxPages;
const selectFavMaxPages = (state: AppState) => state.filters.favMoviesSlice.favMaxPages;
const selectSortType = (state: AppState) => state.filters.sortSlice.sortType;
const selectSearchQuery = (state: AppState) => state.filters.moviesSlice.searchQuery;
const selectYearRange = (state: AppState) => state.filters.yearRangeSlice.yearRange;
const selectFavMoviesIds = (state: AppState) => state.filters.favMoviesSlice.favMoviesIds;

const selectGenreIdsString = createAppSelector([selectGenres], (genres) =>
  genres.map((genre) => genre.id).join(',')
);

const selectCurrentMaxPages = createAppSelector([selectMaxPages], (maxPages) =>
  Math.min(maxPages, POSSIBLE_PAGES)
);

const selectCurrentFavMaxPages = createAppSelector([selectFavMaxPages], (favMaxPages) =>
  Math.min(favMaxPages, POSSIBLE_PAGES)
);

export {
  selectCurrentMaxPages,
  selectCurrentFavMaxPages,
  selectGenreIdsString,
  selectCurrentPage,
  selectFavMovies,
  selectYearRange,
  selectMovies,
  selectGenres,
  selectSortType,
  selectFavMoviesIds,
  selectSearchQuery,
};
