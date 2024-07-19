import fetchFavoriteMovie from '@/api/favorites/fetchFavoriteMovie';
import getFavoriteMoviesList from '@/api/favorites/getFavoriteMoviesList';
import { useAuth } from '@/hooks/useAuth';
import { useFilters } from '@/hooks/useFilters';
import { useFiltersDispatch } from '@/hooks/useFiltersDispatch';
import { Favorite } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

interface FavoriteButtonProps {
  id: number;
}

function FavoriteButton({ id }: FavoriteButtonProps) {
  const authState = useAuth();
  const filtersState = useFilters();
  const filtersDispatch = useFiltersDispatch();

  const { favoriteMovies, currentPage } = filtersState;
  const { userId } = authState;

  const isFavoriteInContext = favoriteMovies.some((movie) => movie.id === id);
  const [isFavorite, setIsFavorite] = useState(isFavoriteInContext);

  useEffect(() => {
    setIsFavorite(favoriteMovies.some((movie) => movie.id === id));
  }, [favoriteMovies, id]);

  const handleFavoriteToggle = useCallback(async () => {
    try {
      if (userId) {
        const newFavoriteStatus = !isFavorite;
        const toggleFavoriteResponse = await fetchFavoriteMovie(userId, id, newFavoriteStatus);

        if (toggleFavoriteResponse.success) {
          const favoriteListResponse = await getFavoriteMoviesList(userId);

          filtersDispatch({
            type: 'loaded_favorite_movies',
            favoriteMovies: favoriteListResponse.results,
            currentFavPage: favoriteListResponse.page,
            maxFavPages: favoriteListResponse.total_pages,
          });

          setIsFavorite(newFavoriteStatus);

          toast.success(isFavorite ? 'Successfully removed card' : 'Successfully added card');
        } else {
          throw new Error('Failed to toggle favorite');
        }
      } else {
        throw new Error('User not authenticated');
      }
    } catch (error) {
      toast.error('Failed to toggle favorite');
      console.error('Failed to update Favorite Movie:', error);
    }
  }, [userId, id, isFavorite, filtersDispatch, currentPage]);

  return (
    <IconButton aria-label="favorite" onClick={handleFavoriteToggle}>
      <Favorite color={isFavorite ? 'primary' : 'disabled'} />
    </IconButton>
  );
}

export default FavoriteButton;
