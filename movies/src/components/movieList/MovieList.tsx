import { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Grid, Alert } from '@mui/material';
import MovieCard from './movieCard/MovieCard';
import getFavoriteMoviesList from '@/api/favorites/getFavoriteMoviesList';
import getSearchedMovies from '@/api/movies/getSearchedMovies';
import { useDebouncedCallback } from 'use-debounce';
import getSortedMovies from '@/api/movies/getSortedMovies';
import MovieListSkeleton from './MovieListSkeleton';
import { Movie, MoviesResponse } from '@/types/movies/movies.types';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { changeMaxPages, loadFavoriteMoviesIds } from '@/store/filters/filtersActions';
import {
  selectCurrentPage,
  selectGenreIdsString,
  selectSearchQuery,
  selectSortType,
  selectYearRange,
} from '@/store/filters/filtersSelectors';
import { selectUserId } from '@/store/auth/authSelectors';
import { FAVORITES_OPTION } from '../filters/sortSelect/constants';

function MovieList() {
  const [error, setError] = useState<string | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);

  const userId = useAppSelector(selectUserId);

  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(selectCurrentPage);
  const sortType = useAppSelector(selectSortType);
  const searchQuery = useAppSelector(selectSearchQuery);
  const yearRange = useAppSelector(selectYearRange);
  const genreIdsString = useAppSelector(selectGenreIdsString);

  const isFavorites = useMemo(() => sortType === FAVORITES_OPTION, [sortType]);

  const [minYear, maxYear] = yearRange.range;

  console.log('Render List');

  const fetchMovies = useCallback(async () => {
    setError(null);
    if (!userId) {
      return null;
    }
    try {
      let response: MoviesResponse | undefined;
      const sortedOptions = { currentPage, minYear, maxYear, sortType, genreIdsString };

      switch (true) {
        case !searchQuery && !isFavorites:
          response = await getSortedMovies(sortedOptions);
          break;
        case isFavorites:
          response = await getFavoriteMoviesList(userId, currentPage);
          break;
        case !!searchQuery:
          response = await getSearchedMovies(searchQuery, currentPage);
          break;
        default:
          response = undefined;
      }

      if (!response || !response.results) {
        setError('Movies Not Found');
        return null;
      }

      setMovies(response.results);
      dispatch(changeMaxPages(response.total_pages));
    } catch (error) {
      setError('Failed to fetch movies. Please try again later.');
      console.error(error);
    }
  }, [sortType, currentPage, searchQuery, isFavorites, yearRange, genreIdsString, dispatch]);

  const debouncedFetchMovies = useDebouncedCallback(fetchMovies, 300);

  useEffect(() => {
    debouncedFetchMovies();
  }, [
    debouncedFetchMovies,
    sortType,
    currentPage,
    searchQuery,
    yearRange,
    genreIdsString,
    dispatch,
  ]);

  const loadFavorites = useCallback(async () => {
    try {
      if (userId) {
        const response = await getFavoriteMoviesList(userId, currentPage);
        const favIds = response.results.map((movie) => movie.id);

        dispatch(loadFavoriteMoviesIds(favIds));
      }
    } catch (error) {
      console.error('Failed to fetch Favorite Movies List:', error);
    }
  }, [userId, currentPage, dispatch]);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const memoMovieCards = useMemo(
    () =>
      movies.map((movie) => (
        <Grid item xs={12} md={6} lg={3} key={movie.id} display="flex" flexDirection="column">
          <MovieCard movie={movie} />
        </Grid>
      )),
    [movies]
  );

  return (
    <Box flex="1">
      {error ? (
        <Alert severity="error">{error}</Alert>
      ) : movies.length === 0 ? (
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
