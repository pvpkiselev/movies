import { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Grid, Alert } from '@mui/material';
import MovieCard from './movieCard/MovieCard';
import getFavoriteMoviesList from '@/api/favorites/getFavoriteMoviesList';
import getSearchedMovies from '@/api/movies/getSearchedMovies';
import getSortedMovies from '@/api/movies/getSortedMovies';
import MovieListSkeleton from './MovieListSkeleton';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { selectMoviesValues } from '@/store/filters/filtersSelectors';
import { selectUserId } from '@/store/auth/authSelectors';
import { FAVORITES_OPTION } from '../filters/sortSelect/constants';
import { Movie } from './types/movies.types';
import { changedMaxPages, loadedFavoriteMoviesIds } from '@/store/filtersSlice';

function MovieList() {
  const [error, setError] = useState<string | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);

  const userId = useAppSelector(selectUserId);

  const dispatch = useAppDispatch();
  const { currentPage, sortType, searchQuery, yearRange, genreIdsString } =
    useAppSelector(selectMoviesValues);
  const [minYear, maxYear] = yearRange;

  const isFavorites = useMemo(() => sortType === FAVORITES_OPTION, [sortType]);

  const fetchMovies = useCallback(async () => {
    setError(null);
    if (!userId) {
      return null;
    }

    const sortedOptions = { currentPage, minYear, maxYear, sortType, genreIdsString };

    try {
      let response;

      if (!searchQuery && !isFavorites) {
        response = await getSortedMovies(sortedOptions);
      } else if (isFavorites) {
        response = await getFavoriteMoviesList(userId, currentPage);
      } else if (searchQuery) {
        response = await getSearchedMovies(searchQuery, currentPage);
      }

      if (!response) {
        setError('Movies Not Found');
        return null;
      }

      setMovies(response.results);
      dispatch(changedMaxPages(response.total_pages));
    } catch (error) {
      setError('Failed to fetch movies. Please try again later.');
      console.error(error);
    }
  }, [sortType, currentPage, searchQuery, isFavorites, minYear, maxYear, genreIdsString, dispatch]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const loadFavorites = async () => {
    try {
      if (userId) {
        const response = await getFavoriteMoviesList(userId, currentPage);
        const favIds = response.results.map((movie) => movie.id);

        dispatch(loadedFavoriteMoviesIds(favIds));
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
