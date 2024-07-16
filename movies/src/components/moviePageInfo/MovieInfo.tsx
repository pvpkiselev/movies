import { CardContent, Typography } from '@mui/material';
import MovieCast from './MovieCast';
import MovieDetails from './movieDetails/MovieDetails';
import { useLoaderData } from 'react-router-dom';
import { MovieInfoLoaderData } from '@/types/movies/movieInfoLoader.types';

function MovieInfo() {
  const data = useLoaderData() as MovieInfoLoaderData;
  const { details, credits } = data;

  return (
    <CardContent
      sx={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: 10,
        paddingInline: {
          xs: 0,
          md: 6,
        },
        paddingBlock: {
          xs: 4,
          md: 0,
        },
        width: '100%',
      }}
    >
      <Typography variant="h3" component="h1">
        {details.title}
      </Typography>
      <MovieCast cast={credits.cast} />
      <MovieDetails details={details} crew={credits.crew} />
    </CardContent>
  );
}

export default MovieInfo;
