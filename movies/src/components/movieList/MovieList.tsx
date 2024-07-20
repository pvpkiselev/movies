import { useCallback, useEffect, useState } from 'react';
import { Box, Typography, Grid, CircularProgress, Alert } from '@mui/material';
import MovieCard from './movieCard/MovieCard';
import { useFiltersDispatch } from '@/hooks/useFiltersDispatch';
import { useFilters } from '@/hooks/useFilters';
import getFavoriteMoviesList from '@/api/favorites/getFavoriteMoviesList';
import getSearchedMovies from '@/api/movies/getSearchedMovies';
import { useAuth } from '@/hooks/useAuth';
import { useDebouncedCallback } from 'use-debounce';
import getSortedMovies from '@/api/movies/getSortedMovies';

function MovieList() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const authState = useAuth();
  const filtersState = useFilters();
  const filtersDispatch = useFiltersDispatch();

  const {
    currentPage,
    sort,
    searchQuery,
    movies,
    favoriteMovies,
    showFavorites,
    yearRange,
    genres,
  } = filtersState;
  const [minYear, maxYear] = yearRange.range;
  const { userId } = authState;
  const moviesListToShow = showFavorites ? favoriteMovies : movies;

  const fetchMovies = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      let response;

      const filteredGenres = genres.filter((genre) => genre.checked);
      const genresIds = filteredGenres.map((genre) => genre.id).join(',');

      const sortedOptions = { currentPage, minYear, maxYear, sort, genresIds };

      if (!searchQuery) {
        response = await getSortedMovies(sortedOptions);
      } else {
        response = await getSearchedMovies(searchQuery, currentPage);
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
      setError('Failed to fetch movies. Please try again later.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [sort, currentPage, searchQuery, yearRange, genres, filtersDispatch]);

  const debouncedFetchMovies = useDebouncedCallback(fetchMovies, 300);

  useEffect(() => {
    debouncedFetchMovies();
  }, [debouncedFetchMovies, sort, currentPage, searchQuery, yearRange, genres]);

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
    <Box flex="1">
      <Typography variant="h3" component="h1" sx={{ paddingBottom: 4 }}>
        Movie List
      </Typography>
      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid container spacing={3} wrap="wrap">
          {moviesListToShow.map((movie) => (
            <Grid item xs={12} md={6} lg={3} key={movie.id} display="flex" flexDirection="column">
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default MovieList;
