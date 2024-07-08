import { CardContent, Typography } from '@mui/material';
import MovieCast from './MovieCast';
import { MovieDetailsType } from '@/types/movies/movieDetails.types';
import { Actor, CrewMember } from '@/types/movies/movieCredits.types';
import MovieDetails from './movieDetails/MovieDetails';

interface MovieInfoProps {
  details: MovieDetailsType;
  cast: Actor[];
  crew: CrewMember[];
}

function MovieInfo({ details, cast, crew }: MovieInfoProps) {
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
      <MovieCast cast={cast} />
      <MovieDetails details={details} crew={crew} />
    </CardContent>
  );
}

export default MovieInfo;
