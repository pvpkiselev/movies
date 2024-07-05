import { useEffect, useState } from 'react';
import { Box, Typography, Grid, CircularProgress, Alert } from '@mui/material';
import MovieCard from './movieCard/MovieCard';
import { useFilterContext, useFilterDispatchContext } from '@/contexts/filterContext/filterContext';
import { imageUrl } from './constants';
import getSortedMovies from '@/api/getSortedMovies';
import { MoviesResponse } from './movies.types';

function MovieList() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filtersState = useFilterContext();
  const dispatch = useFilterDispatchContext();

  useEffect(() => {
    let ignoreFetch = false;

    async function fetchMovies() {
      setIsLoading(true);
      setError(null);
      try {
        const response = (await getSortedMovies(
          filtersState.sort,
          filtersState.currentPage
        )) as MoviesResponse;

        if (!ignoreFetch) {
          dispatch({
            type: 'loaded_movies',
            movies: response.results,
            currentPage: response.page,
          });
        }
      } catch (err) {
        if (!ignoreFetch) {
          setError('Failed to fetch movies. Please try again later.');
        }
      } finally {
        if (!ignoreFetch) {
          setIsLoading(false);
        }
      }
    }

    fetchMovies();

    return () => {
      ignoreFetch = true;
    };
  }, [filtersState.sort, filtersState.currentPage, dispatch]);

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
        <Grid container spacing={3} sx={{ display: 'flex', flexWrap: 'wrap' }}>
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
