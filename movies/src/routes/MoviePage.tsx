import { Container, Card, Grid } from '@mui/material';
import MoviePoster from '@/components/moviePageInfo/MoviePoster';
import MovieInfo from '@/components/moviePageInfo/MovieInfo';
import { useParams } from 'react-router-dom';

function MoviePage() {
  const { movieId } = useParams();

  return (
    <Container maxWidth="lg">
      <Card elevation={0}>
        <Grid container direction={{ xs: 'column', md: 'row' }}>
          <Grid item xs={12} md={6}>
            <MoviePoster />
          </Grid>
          <Grid item xs={12} md={6}>
            <MovieInfo movieId={movieId} />
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}

export default MoviePage;
