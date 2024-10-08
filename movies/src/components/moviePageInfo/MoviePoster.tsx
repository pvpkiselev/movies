import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { CardMedia } from '@mui/material';

import { IMAGE_ORIGINAL, PLACEHOLDER_IMAGE_PATH } from '@/api/constants';
import { MovieInfoLoaderData } from '@/loaders/types/movieInfoLoader.types';

function MoviePoster() {
  const [imageError, setImageError] = useState(false);
  const data = useLoaderData() as MovieInfoLoaderData;
  const { details } = data;

  const imageUrl =
    imageError || !details.poster_path
      ? PLACEHOLDER_IMAGE_PATH
      : `${IMAGE_ORIGINAL}${details.poster_path}`;

  return (
    <CardMedia
      component="img"
      image={imageUrl}
      title={details.title}
      onError={() => setImageError(true)}
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
