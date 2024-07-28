import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { selectUserId } from '@/store/auth/authSelectors';
import { useAppDispatch, useAppSelector } from '@/store/redux';
import { fetchFavoriteMovieAction } from '@/store/filters/actions/thunks/fetchFavoriteMovieAction';
import { selectFavMoviesIds } from '@/store/filters/selectors/filtersSelectors';
import { toastMessages } from '@/helpers/constants';

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
        toast.success(
          !isFavorite ? toastMessages.favorites.success_add : toastMessages.favorites.success_delete
        );
      }
    } else {
      toast.error(toastMessages.favorites.failed);
    }
  }, [id, isFavorite, userId, dispatch]);

  return {
    isFavorite,
    handleFavoriteToggle,
  };
}
