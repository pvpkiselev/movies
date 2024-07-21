import { useCallback, useEffect, useState } from 'react';
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

function MovieList() {
  const [error, setError] = useState<string | null>(null);

  const authState = useAuth();
  const filtersState = useFilters();
  const filtersDispatch = useFiltersDispatch();

  const { currentPage, sort, searchQuery, movies, yearRange, genres } = filtersState;
  const { sorted, favorites } = movies;
  const [minYear, maxYear] = yearRange.range;
  const { userId } = authState;

  const isFavorites = sort === FAVORITES_OPTION;
  const moviesListToShow = isFavorites ? favorites : sorted;

  const fetchMovies = useCallback(async () => {
    setError(null);
    if (!userId) {
      return null;
    }
    try {
      let response;
      let responseType: 'sorted' | 'favorites' = 'sorted';

      const filteredGenres = genres.filter((genre) => genre.checked);
      const genresIds = filteredGenres.map((genre) => genre.id).join(',');

      const sortedOptions = { currentPage, minYear, maxYear, sort, genresIds };

      if (!searchQuery && !isFavorites) {
        response = await getSortedMovies(sortedOptions);
      } else if (isFavorites) {
        response = await getFavoriteMoviesList(userId, currentPage);
        responseType = 'favorites';
      } else {
        response = await getSearchedMovies(searchQuery, currentPage);
      }

      const isEmptyResponseList = !response || !response.results;
      if (isEmptyResponseList) {
        setError('Movies Not Found');
        return null;
      }

      if (responseType === 'sorted') {
        console.log(response.page, response.total_pages);
        filtersDispatch({
          type: 'loaded_movies',
          movies: response.results,
          currentPage: response.page,
          maxPages: response.total_pages,
        });
      } else if (responseType === 'favorites') {
        console.log(response.page, response.total_pages);
        filtersDispatch({
          type: 'loaded_favorite_movies',
          favorites: response.results,
          currentPage: response.page,
          maxPages: response.total_pages,
        });
      }
    } catch (error) {
      setError('Failed to fetch movies. Please try again later.');
      console.error(error);
    }
  }, [sort, currentPage, searchQuery, yearRange, genres, filtersDispatch]);

  const debouncedFetchMovies = useDebouncedCallback(fetchMovies, 300);

  useEffect(() => {
    debouncedFetchMovies();
  }, [debouncedFetchMovies, sort, currentPage, searchQuery, yearRange, genres, filtersDispatch]);

  const loadFavorites = async () => {
    try {
      if (userId) {
        const response = await getFavoriteMoviesList(userId, currentPage);

        filtersDispatch({
          type: 'loaded_favorite_movies',
          favorites: response.results,
        });
      }
    } catch (error) {
      console.error('Failed to fetch Favorite Movies List:', error);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <Box flex="1">
      {error ? (
        <Alert severity="error">{error}</Alert>
      ) : moviesListToShow.length === 0 ? (
        <MovieListSkeleton />
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
