import { CardMedia } from '@mui/material';
import { imageUrlFullSize } from '@/components/movieList/constants';
import { MovieInfoLoaderData } from '@/types/movies/movieInfoLoader.types';
import { useLoaderData } from 'react-router-dom';

function MoviePoster() {
  const data = useLoaderData() as MovieInfoLoaderData;
  const { details } = data;
  return (
    <CardMedia
      component="img"
      image={`${imageUrlFullSize}${details.poster_path}`}
      title={details.title}
      sx={{
        aspectRatio: {
          sm: '16/9',
          md: '3/4',
        },
        width: '100%',
      }}
    />
  );
}

export default MoviePoster;
