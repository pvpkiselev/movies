import { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Grid, Alert } from '@mui/material';
import MovieCard from './movieCard/MovieCard';
import { useFiltersDispatch } from '@/hooks/useFiltersDispatch';
import { useFilters } from '@/hooks/useFilters';
import getFavoriteMoviesList from '@/api/favorites/getFavoriteMoviesList';
import getSearchedMovies from '@/api/movies/getSearchedMovies';
import { useAuth } from '@/hooks/useAuth';
import { useDebouncedCallback } from 'use-debounce';
import getSortedMovies from '@/api/movies/getSortedMovies';
import MovieListSkeleton from './MovieListSkeleton';
import { FAVORITES_OPTION } from '../filters/sortSelect/constants';
import { Movie } from '@/types/movies/movies.types';

function MovieList() {
  const [error, setError] = useState<string | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);

  const authState = useAuth();
  const filtersState = useFilters();
  const filtersDispatch = useFiltersDispatch();

  const { currentPage, sort, searchQuery, yearRange, genreIds } = filtersState;

  const [minYear, maxYear] = yearRange.range;
  const { userId } = authState;

  const isFavorites = sort === FAVORITES_OPTION;

  const fetchMovies = useCallback(async () => {
    setError(null);
    if (!userId) {
      return null;
    }
    try {
      let response;

      const genresIds = genreIds.map((genre) => genre).join(',');

      const sortedOptions = { currentPage, minYear, maxYear, sort, genresIds };

      if (!searchQuery && !isFavorites) {
        response = await getSortedMovies(sortedOptions);
      } else if (isFavorites) {
        response = await getFavoriteMoviesList(userId, currentPage);
      } else {
        response = await getSearchedMovies(searchQuery, currentPage);
      }

      const isEmptyResponseList = !response || !response.results;
      if (isEmptyResponseList) {
        setError('Movies Not Found');
        return null;
      }

      setMovies(response.results);
      filtersDispatch({
        type: 'changed_max_pages',
        maxPages: response.total_pages,
      });
    } catch (error) {
      setError('Failed to fetch movies. Please try again later.');
      console.error(error);
    }
  }, [sort, currentPage, searchQuery, isFavorites, yearRange, genreIds, filtersDispatch]);

  const debouncedFetchMovies = useDebouncedCallback(fetchMovies, 300);

  useEffect(() => {
    debouncedFetchMovies();
  }, [debouncedFetchMovies, sort, currentPage, searchQuery, yearRange, genreIds, filtersDispatch]);

  const loadFavorites = async () => {
    try {
      if (userId) {
        const response = await getFavoriteMoviesList(userId, currentPage);
        const favIds = response.results.map((movie) => movie.id);

        filtersDispatch({
          type: 'loaded_fav_movies_ids',
          favMoviesIds: favIds,
        });
      }
    } catch (error) {
      console.error('Failed to fetch Favorite Movies List:', error);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

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
