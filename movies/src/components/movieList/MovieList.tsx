import { useEffect, useState } from 'react';
import { Box, Typography, Grid, CircularProgress, Alert } from '@mui/material';
import MovieCard from './movieCard/MovieCard';
import { imageUrl } from './constants';
import { POPULAR_OPTION, TOP_RATED_OPTION } from '../filters/sortSelect/constants';
import getPopularMovies from '@/api/getPopularMovies';
import getTopRatedMovies from '@/api/getTopRatedMovies';
import { useFiltersDispatch } from '@/hooks/useFiltersDispatch';
import { useFilters } from '@/hooks/useFilters';
import Cookies from 'js-cookie';
import getFavoriteMoviesList from '@/api/getFavoriteMoviesList';

function MovieList() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filtersState = useFilters();
  const filtersDispatch = useFiltersDispatch();

  useEffect(() => {
    const abortController = new AbortController();

    const fetchMovies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const currentPage = filtersState.currentPage;
        const currentSortBy = filtersState.sort;

        let response;

        if (currentSortBy === POPULAR_OPTION) {
          response = await getPopularMovies(currentPage, abortController.signal);
        } else if (currentSortBy === TOP_RATED_OPTION) {
          response = await getTopRatedMovies(currentPage, abortController.signal);
        }

        if (response) {
          filtersDispatch({
            type: 'loaded_movies',
            movies: response.results,
            currentPage: response.page,
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
    };

    fetchMovies();

    return () => {
      abortController.abort();
    };
  }, [filtersState.sort, filtersState.currentPage, filtersDispatch]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const userId = Cookies.get('userId');
        if (userId) {
          const response = await getFavoriteMoviesList(userId);
          const favoriteMovies = response.results.map((movie) => movie.id);

          filtersDispatch({
            type: 'loaded_favorite_movies',
            favoriteMovies,
          });
        }
      } catch (error) {
        console.error('Failed to fetch Favorite Movies List:', error);
      }
    };

    loadFavorites();
  }, [filtersDispatch]);

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
          {filtersState.movies.map((movie) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={3}
              key={movie.id}
              sx={{ display: 'flex', flexDirection: 'column' }}
            >
              <MovieCard
                linkId={movie.id}
                title={movie.title}
                imageSrc={`${imageUrl}${movie.backdrop_path}`}
                rating={movie.vote_average.toFixed(1)}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default MovieList;
