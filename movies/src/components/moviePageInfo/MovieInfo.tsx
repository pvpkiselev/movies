import { useLoaderData, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, CardContent, Stack, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

import MovieCast from './MovieCast';
import MovieDetails from './movieDetails/MovieDetails';
import FavoriteButton from '../common/favoriteButton/FavoriteButton';
import { MovieInfoLoaderData } from '@/loaders/types/movieInfoLoader.types';

function MovieInfo() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const data = useLoaderData() as MovieInfoLoaderData;
  const { details, credits } = data;

  const handleBack = () => {
    navigate(from, { replace: true });
  };

  return (
    <CardContent
      sx={{
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
      <Stack gap={8}>
        <Stack direction="row" alignItems="center">
          <Typography variant="h3" component="h1">
            {details.title}
          </Typography>
          <FavoriteButton id={Number(movieId)} />
        </Stack>
        <Button variant="outlined" startIcon={<ArrowBack />} onClick={handleBack}>
          Move back
        </Button>
        <MovieCast cast={credits.cast} />
        <MovieDetails details={details} crew={credits.crew} />
      </Stack>
    </CardContent>
  );
}

export default MovieInfo;
