import { useEffect, useState } from 'react';
import { Box, Typography, Grid, CircularProgress, Alert } from '@mui/material';
import MovieCard from './movieCard/MovieCard';
import { POPULAR_OPTION, TOP_RATED_OPTION } from '../filters/sortSelect/constants';
import getPopularMovies from '@/api/getPopularMovies';
import getTopRatedMovies from '@/api/getTopRatedMovies';
import { useFiltersDispatch } from '@/hooks/useFiltersDispatch';
import { useFilters } from '@/hooks/useFilters';
import getFavoriteMoviesList from '@/api/getFavoriteMoviesList';
import getSearchedMovies from '@/api/getSearchedMovies';
import Cookies from 'js-cookie';

function MovieList() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filtersState = useFilters();
  const filtersDispatch = useFiltersDispatch();

  const { currentPage, sort, searchQuery, movies, favoriteMovies } = filtersState;

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let response;

        if (!filtersState.searchQuery) {
          if (sort === POPULAR_OPTION) {
            response = await getPopularMovies(currentPage);
          } else if (sort === TOP_RATED_OPTION) {
            response = await getTopRatedMovies(currentPage);
          }
        } else {
          response = await getSearchedMovies(filtersState.searchQuery, currentPage);
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
          });
        }
      } catch (error) {
        setError('Failed to fetch movies. Please try again later.');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [sort, currentPage, searchQuery, filtersDispatch]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const userId = Cookies.get('userId');
        if (userId) {
          const response = await getFavoriteMoviesList(userId, currentPage);

          filtersDispatch({
            type: 'loaded_favorite_movies',
            favoriteMovies: response.results,
            currentPage: response.page,
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
          {movies.map((movie) => (
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
