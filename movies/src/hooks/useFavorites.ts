import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { selectUserId } from '@/store/auth/authSelectors';
import { selectFavMoviesIds } from '@/store/filters/filtersSelectors';
import { useAppDispatch, useAppSelector } from '@/store/redux';
import { fetchFavoriteMovieAction } from '@/store/filters/thunks/thunks';

interface UseFavoriteProps {
  id: number;
}

export function useFavorite({ id }: UseFavoriteProps) {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);
  const favMoviesIds = useAppSelector(selectFavMoviesIds);

  const isFavorite = favMoviesIds.includes(id);

  const handleFavoriteToggle = useCallback(async () => {
    const result = await dispatch(
      fetchFavoriteMovieAction({
        userId,
        movieId: id,
        isFavorite: !isFavorite,
      })
    );

    if (fetchFavoriteMovieAction.fulfilled.match(result)) {
      toast.success(!isFavorite ? 'Successfully added card' : 'Successfully removed card');
    } else {
      toast.error('Failed to toggle favorite');
    }
  }, [id, isFavorite, userId, dispatch]);

  return {
    isFavorite,
    handleFavoriteToggle,
  };
}
