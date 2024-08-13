import { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Grid, Alert } from '@mui/material';

import { useAppDispatch, useAppSelector } from '@/store/redux';
import {
  selectCurrentPage,
  selectFavMovies,
  selectGenreIdsString,
  selectMovies,
  selectSearchQuery,
  selectSortType,
  selectYearRange,
} from '@/store/filters/selectors/filtersSelectors';
import { selectUserId } from '@/store/auth/authSelectors';
import { fetchFavoriteMoviesListAction } from '@/store/filters/actions/thunks/fetchFavoriteMoviesListAction';
import { fetchSortedMoviesAction } from '@/store/filters/actions/thunks/fetchSortedMoviesAction';
import { fetchSearchedMoviesAction } from '@/store/filters/actions/thunks/fetchSearchedMoviesAction';
import MovieCard from './movieCard/MovieCard';
import MovieListSkeleton from './MovieListSkeleton';
import { FAVORITES_OPTION } from '../filters/sortSelect/constants';
import { movieListErrors } from '@/helpers/constants';

function MovieList() {
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);
  const movies = useAppSelector(selectMovies);
  const favMovies = useAppSelector(selectFavMovies);
  const currentPage = useAppSelector(selectCurrentPage);
  const sortType = useAppSelector(selectSortType);
  const searchQuery = useAppSelector(selectSearchQuery);
  const yearRange = useAppSelector(selectYearRange);
  const genreIdsString = useAppSelector(selectGenreIdsString);

  const [minYear, maxYear] = yearRange;
  const isFavorites = sortType === FAVORITES_OPTION;
  const moviesToShow = isFavorites ? favMovies : movies;
  const isMovieListEmpty = moviesToShow.length === 0;
  const isSortedFetch = !searchQuery && !isFavorites;

  const fetchMovies = useCallback(async () => {
    setError(null);
    if (!userId) {
      return null;
    }

    const sortedOptions = { currentPage, minYear, maxYear, sortType, genreIdsString };
    const favoriteOptions = { userId, currentPage };
    const searchOptions = { searchQuery, currentPage };

    try {
      switch (true) {
        case isSortedFetch:
          await dispatch(fetchSortedMoviesAction(sortedOptions));
          break;

        case isFavorites:
          await dispatch(fetchFavoriteMoviesListAction(favoriteOptions));
          break;

        case !!searchQuery:
          await dispatch(fetchSearchedMoviesAction(searchOptions));
          break;

        default:
          setError(movieListErrors.invalid_option);
          break;
      }
    } catch (error) {
      setError(movieListErrors.fetch_failed);
      console.error(error);
    }
  }, [sortType, currentPage, searchQuery, isFavorites, minYear, maxYear, genreIdsString]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  useEffect(() => {
    if (userId) {
      dispatch(
        fetchFavoriteMoviesListAction({
          userId,
        })
      );
    }
  }, []);

  const memoMovieCards = useMemo(
    () =>
      moviesToShow.map((movie) => (
        <Grid item xs={12} md={6} lg={3} key={movie.id} display="flex" flexDirection="column">
          <MovieCard movie={movie} />
        </Grid>
      )),
    [moviesToShow]
  );

  return (
    <Box flex="1">
      {error ? (
        <Alert severity="error">{error}</Alert>
      ) : isMovieListEmpty ? (
        <MovieListSkeleton />
      ) : (
        <Grid container spacing={3} wrap="wrap">
          {memoMovieCards}
        </Grid>
      )}
    </Box>
  );
}

export default MovieList;
