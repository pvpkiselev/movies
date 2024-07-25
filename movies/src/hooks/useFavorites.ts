import fetchFavoriteMovie from '@/api/favorites/fetchFavoriteMovie';
import { selectUserId } from '@/store/auth/authSelectors';
import { selectFavMoviesIds } from '@/store/filters/filtersSelectors';
import { toggledFavorite } from '@/store/filtersSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';

interface UseFavoriteProps {
  id: number;
}

export function useFavorite({ id }: UseFavoriteProps) {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);
  const favMoviesIds = useAppSelector(selectFavMoviesIds);

  const isFavorite = useMemo(() => favMoviesIds.includes(id), [favMoviesIds, id]);

  const handleFavoriteToggle = useCallback(async () => {
    try {
      if (userId) {
        const toggleFavoriteResponse = await fetchFavoriteMovie(userId, id, !isFavorite);

        if (toggleFavoriteResponse.success) {
          dispatch(toggledFavorite(id));
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
  }, [id, isFavorite, userId, dispatch]);

  return {
    isFavorite,
    handleFavoriteToggle,
  };
}
