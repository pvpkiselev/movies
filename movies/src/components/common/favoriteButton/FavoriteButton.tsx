import fetchFavoriteMovie from '@/api/favorites/fetchFavoriteMovie';
import getFavoriteMoviesList from '@/api/favorites/getFavoriteMoviesList';
import { useAuth } from '@/hooks/useAuth';
import { useFilters } from '@/hooks/useFilters';
import { useFiltersDispatch } from '@/hooks/useFiltersDispatch';
import { Favorite } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';

interface FavoriteButtonProps {
  id: number;
}

function FavoriteButton({ id }: FavoriteButtonProps) {
  const authState = useAuth();
  const filtersState = useFilters();
  const filtersDispatch = useFiltersDispatch();

  const { favorites } = filtersState.movies;
  const { userId } = authState;

  const isFavoriteInContext = favorites.some((movie) => movie.id === id);
  const [isFavorite, setIsFavorite] = useState(isFavoriteInContext);

  const updateFavoriteMoviesList = async () => {
    if (!userId) return;
    const updatedFavorites = await getFavoriteMoviesList(userId);
    filtersDispatch({
      type: 'loaded_favorite_movies',
      favorites: updatedFavorites.results,
    });
  };

  const handleFavoriteToggle = useCallback(async () => {
    try {
      if (userId) {
        const newFavoriteStatus = !isFavorite;
        const toggleFavoriteResponse = await fetchFavoriteMovie(userId, id, newFavoriteStatus);

        if (toggleFavoriteResponse.success) {
          setIsFavorite(newFavoriteStatus);
          await updateFavoriteMoviesList();
          toast.success(
            newFavoriteStatus ? 'Successfully added card' : 'Successfully removed card'
          );
        } else {
          throw new Error('Failed to toggle favorite');
        }
      } else {
        throw new Error('User not authenticated');
      }
    } catch (error) {
      setIsFavorite(!isFavorite);
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

export default FavoriteButton;
