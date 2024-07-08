import { Container, Card, Grid } from '@mui/material';
import { useLoaderData } from 'react-router-dom';
import { MovieInfoLoaderData } from '@/types/movies/movieInfoLoader.types';
import MoviePoster from '@/components/movieInfo/MoviePoster';
import MovieInfo from '@/components/movieInfo/MovieInfo';

function MoviePage() {
  const data = useLoaderData() as MovieInfoLoaderData;
  const { details, credits } = data;

  return (
    <Container maxWidth="lg">
      <Card elevation={0}>
        <Grid container direction={{ xs: 'column', md: 'row' }}>
          <Grid item xs={12} md={6}>
            <MoviePoster posterPath={details.poster_path} title={details.title} />
          </Grid>
          <Grid item xs={12} md={6}>
            <MovieInfo details={details} cast={credits.cast} crew={credits.crew} />
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}

export default MoviePage;
