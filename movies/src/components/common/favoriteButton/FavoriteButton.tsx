import fetchFavoriteMovie from '@/api/favorites/fetchFavoriteMovie';
import { useAuth } from '@/hooks/useAuth';
import { useFilters } from '@/hooks/useFilters';
import { useFiltersDispatch } from '@/hooks/useFiltersDispatch';
import { Favorite } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useCallback } from 'react';
import toast from 'react-hot-toast';

interface FavoriteButtonProps {
  id: number;
}

export default function FavoriteButton({ id }: FavoriteButtonProps) {
  const authState = useAuth();
  const filtersState = useFilters();
  const filtersDispatch = useFiltersDispatch();

  const { favMoviesIds } = filtersState;
  const { userId } = authState;

  const isFavorite = favMoviesIds.includes(id);

  const handleFavoriteToggle = useCallback(async () => {
    try {
      if (userId) {
        const toggleFavoriteResponse = await fetchFavoriteMovie(userId, id, !isFavorite);

        if (toggleFavoriteResponse.success) {
          filtersDispatch({
            type: 'toggled_fav',
            favId: id,
          });
          toast.success(!isFavorite ? 'Successfully added card' : 'Successfully removed card');
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
  }, [id, isFavorite, userId]);

  return (
    <IconButton aria-label="favorite" onClick={handleFavoriteToggle}>
      <Favorite color={isFavorite ? 'primary' : 'disabled'} />
    </IconButton>
  );
}
