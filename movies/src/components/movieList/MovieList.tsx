import { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Typography, Grid, CircularProgress, Alert } from '@mui/material';
import MovieCard from './movieCard/MovieCard';
import { POPULAR_OPTION, TOP_RATED_OPTION } from '../filters/sortSelect/constants';
import getPopularMovies from '@/api/movies/getPopularMovies';
import getTopRatedMovies from '@/api/movies/getTopRatedMovies';
import { useFiltersDispatch } from '@/hooks/useFiltersDispatch';
import { useFilters } from '@/hooks/useFilters';
import getFavoriteMoviesList from '@/api/favorites/getFavoriteMoviesList';
import getSearchedMovies from '@/api/movies/getSearchedMovies';
import { useAuth } from '@/hooks/useAuth';
import { useDebouncedCallback } from 'use-debounce';

function MovieList() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const authState = useAuth();
  const filtersState = useFilters();
  const filtersDispatch = useFiltersDispatch();

  const { currentPage, sort, searchQuery, movies, favoriteMovies, showFavorites } = filtersState;
  const { userId } = authState;
  const moviesListToShow = showFavorites ? favoriteMovies : movies;

  const activeRequest = useRef<AbortController | null>(null);

  const fetchMovies = useCallback(
    async (abortController: AbortController) => {
      setIsLoading(true);
      setError(null);
      try {
        let response;

        if (!searchQuery) {
          if (sort === POPULAR_OPTION) {
            response = await getPopularMovies(currentPage, abortController.signal);
          } else if (sort === TOP_RATED_OPTION) {
            response = await getTopRatedMovies(currentPage, abortController.signal);
          }
        } else {
          response = await getSearchedMovies(searchQuery, currentPage, abortController.signal);
        }

        const isEmptyResponseList = response?.results.length === 0;
        if (isEmptyResponseList) {
          setError('Movies Not Found');
          return null;
        }

        if (response) {
          filtersDispatch({
            type: 'loaded_movies',
            movies: response.results,
            currentPage: response.page,
            maxPages: response.total_pages,
          });
        }
      } catch (error) {
        if (!abortController.signal.aborted) {
          setError('Failed to fetch movies. Please try again later.');
          console.error(error);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    },
    [sort, currentPage, searchQuery, filtersDispatch]
  );

  const debouncedFetchMovies = useDebouncedCallback(fetchMovies, 300);

  useEffect(() => {
    const abortController = new AbortController();
    activeRequest.current = abortController;

    debouncedFetchMovies(abortController);

    return () => {
      abortController.abort();
      activeRequest.current = null;
    };
  }, [debouncedFetchMovies, sort, currentPage, searchQuery]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        if (userId) {
          const response = await getFavoriteMoviesList(userId);

          filtersDispatch({
            type: 'loaded_favorite_movies',
            favoriteMovies: response.results,
            currentFavPage: response.page,
            maxFavPages: response.total_pages,
          });
        }
      } catch (error) {
        console.error('Failed to fetch Favorite Movies List:', error);
      }
    };

    loadFavorites();
  }, [currentPage, filtersDispatch]);

  return (
    <Box sx={{ flex: 1 }}>
      <Typography variant="h3" component="h1" sx={{ paddingBottom: 4 }}>
        Movie List
      </Typography>
      {isLoading ? (
        <Box
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid container spacing={3} wrap="wrap">
          {moviesListToShow.map((movie) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={3}
              key={movie.id}
              sx={{ display: 'flex', flexDirection: 'column' }}
            >
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default MovieList;
