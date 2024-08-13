import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

import { theme } from '@/theme/theme';

import { IMAGE_PATH, PLACEHOLDER_IMAGE_PATH } from '@/api/constants';
import FavoriteButton from '@/components/common/favoriteButton/FavoriteButton';
import { Movie } from '../types/movies.types';

interface MovieCardProps {
  movie: Movie;
}

function MovieCard({ movie }: MovieCardProps) {
  const [imageError, setImageError] = useState(false);

  const { id, title, backdrop_path, vote_average } = movie;

  const imageSrc =
    imageError || !backdrop_path ? PLACEHOLDER_IMAGE_PATH : `${IMAGE_PATH}${backdrop_path}`;
  const rating = vote_average.toFixed(1);

  return (
    <Card
      elevation={0}
      sx={{
        backgroundColor: theme.palette.grey[50],
        maxWidth: '100%',
        minWidth: '240px',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Link to={`/movies/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <CardMedia
          sx={{ height: 200 }}
          image={imageSrc}
          title={title}
          onError={() => setImageError(true)}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Rating {rating}
          </Typography>
        </CardContent>
      </Link>
      <CardActions>
        <FavoriteButton id={id} />
      </CardActions>
    </Card>
  );
}

export default MovieCard;
