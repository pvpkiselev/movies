import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import { theme } from '@/theme/theme';
import { Link } from 'react-router-dom';
import { Star, StarBorderOutlined } from '@mui/icons-material';
import Cookies from 'js-cookie';
import fetchFavoriteMovie from '@/api/favorites/fetchFavoriteMovie';
import { useFilters } from '@/hooks/useFilters';
import toast from 'react-hot-toast';
import { useFiltersDispatch } from '@/hooks/useFiltersDispatch';
import { Movie } from '@/types/movies/movies.types';
import { useState } from 'react';
import { IMAGE_PATH, PLACEHOLDER_IMAGE_PATH } from '@/api/constants';

interface MovieCardProps {
  movie: Movie;
}

function MovieCard({ movie }: MovieCardProps) {
  const [imageError, setImageError] = useState(false);
  const filtersState = useFilters();
  const filtersDispatch = useFiltersDispatch();

  const { id, title, backdrop_path, vote_average } = movie;

  const imageSrc =
    imageError || !backdrop_path ? PLACEHOLDER_IMAGE_PATH : `${IMAGE_PATH}${backdrop_path}`;
  const rating = vote_average.toFixed(1);

  const { favoriteMovies } = filtersState;

  const isFavorite = favoriteMovies.some((movie) => movie.id === id);

  const handleFavoriteToggle = async (favoriteStatus: boolean) => {
    try {
      const userId = Cookies.get('userId');
      if (userId) {
        const response = await fetchFavoriteMovie(userId, id, !favoriteStatus);
        if (response.success) {
          filtersDispatch({
            type: 'toggle_favorite_movie',
            movie: movie,
          });
          if (isFavorite) {
            toast.success('Successfully removed card');
          } else {
            toast.success('Successfully added card');
          }
        }
      }
    } catch (error) {
      toast.error('Failed toggle card');
      console.error('Failed to update Favorite Movie:', error);
    }
  };

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
        <IconButton onClick={() => handleFavoriteToggle(isFavorite)}>
          {isFavorite ? <Star /> : <StarBorderOutlined />}
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default MovieCard;
