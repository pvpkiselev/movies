import fetchFavoriteMovie from '@/api/favorites/fetchFavoriteMovie';
import { selectUserId } from '@/store/auth/authSelectors';
import { toggleFavorite } from '@/store/filters/filtersActions';
import { selectFavMoviesIds } from '@/store/filters/filtersSelectors';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { Favorite } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';

interface FavoriteButtonProps {
  id: number;
}

export default function FavoriteButton({ id }: FavoriteButtonProps) {
  const userId = useAppSelector(selectUserId);
  const dispatch = useAppDispatch();
  const favMoviesIds = useAppSelector(selectFavMoviesIds);

  const isFavorite = useMemo(() => favMoviesIds.includes(id), [favMoviesIds]);

  const handleFavoriteToggle = useCallback(async () => {
    try {
      if (userId) {
        const toggleFavoriteResponse = await fetchFavoriteMovie(userId, id, !isFavorite);

        if (toggleFavoriteResponse.success) {
          dispatch(toggleFavorite(id));
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
