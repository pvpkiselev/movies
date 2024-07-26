import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { selectUserId } from '@/store/auth/authSelectors';
import { useAppDispatch, useAppSelector } from '@/store/redux';
import { fetchFavoriteMovieAction } from '@/store/filters/actions/thunks/fetchFavoriteMovieAction';
import { selectFavMoviesIds } from '@/store/filters/selectors/filtersSelectors';

interface UseFavoriteProps {
  id: number;
}

export function useFavorite({ id }: UseFavoriteProps) {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);
  const favMoviesIds = useAppSelector(selectFavMoviesIds);

  const isFavorite = favMoviesIds.includes(id);

  const handleFavoriteToggle = useCallback(async () => {
    if (userId) {
      const response = await dispatch(
        fetchFavoriteMovieAction({
          userId,
          movieId: id,
          isFavorite: !isFavorite,
        })
      );
      if (fetchFavoriteMovieAction.fulfilled.match(response)) {
        toast.success(!isFavorite ? 'Successfully added card' : 'Successfully removed card');
      }
    } else {
      toast.error('Failed to toggle favorite');
    }
  }, [id, isFavorite, userId, dispatch]);

  return {
    isFavorite,
    handleFavoriteToggle,
  };
}
