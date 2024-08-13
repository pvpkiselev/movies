import { useCallback } from 'react';
import toast from 'react-hot-toast';

import { selectUserId } from '@/store/auth/authSelectors';
import { useAppDispatch, useAppSelector } from '@/store/redux';
import { selectFavMoviesIds } from '@/store/filters/selectors/filtersSelectors';
import { toastMessages } from '@/helpers/constants';
import fetchFavoriteMovie from '@/api/filters/fetchFavoriteMovie';
import { toggledFavMovie } from '@/store/filters/slices/favMoviesSlice';

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
      try {
        await fetchFavoriteMovie(userId, id, isFavorite);
        dispatch(toggledFavMovie(id));
        toast.success(
          !isFavorite ? toastMessages.favorites.success_add : toastMessages.favorites.success_delete
        );
      } catch (error) {
        console.error(toastMessages.favorites.failed, error);
        toast.error(toastMessages.favorites.failed);
      }
    }
  }, [id, isFavorite, userId]);

  return {
    isFavorite,
    handleFavoriteToggle,
  };
}
