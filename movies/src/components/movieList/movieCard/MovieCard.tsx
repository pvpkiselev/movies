import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import { theme } from '@/theme/theme';
import { Link } from 'react-router-dom';
import { Star, StarBorderOutlined } from '@mui/icons-material';
import Cookies from 'js-cookie';
import fetchFavoriteMovie from '@/api/fetchFavoriteMovie';
import { useFilters } from '@/hooks/useFilters';
import toast from 'react-hot-toast';
import { useFiltersDispatch } from '@/hooks/useFiltersDispatch';

interface MovieCardProps {
  linkId: number;
  title: string;
  imageSrc: string;
  rating: string;
}

function MovieCard(props: MovieCardProps) {
  const { linkId, title, imageSrc, rating } = props;
  const filtersState = useFilters();
  const filtersDispatch = useFiltersDispatch();

  const isFavorite = filtersState.favoriteMovies.includes(linkId);

  const handleFavoriteToggle = async (favoriteStatus: boolean) => {
    try {
      const userId = Cookies.get('userId');
      if (userId) {
        const response = await fetchFavoriteMovie(userId, linkId, !favoriteStatus);
        if (response.success) {
          filtersDispatch({
            type: 'toggle_favorite_movie',
            movieId: linkId,
          });
          toast.success('Successfully toggled card');
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
      <Link to={`/movies/${linkId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <CardMedia sx={{ height: 200 }} image={imageSrc} title={title} />
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
