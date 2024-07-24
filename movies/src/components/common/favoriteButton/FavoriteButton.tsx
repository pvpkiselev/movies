import { useFavorite } from '@/hooks/useFavorites';
import { Favorite } from '@mui/icons-material';
import { IconButton } from '@mui/material';

interface FavoriteButtonProps {
  id: number;
}

export default function FavoriteButton({ id }: FavoriteButtonProps) {
  const { isFavorite, handleFavoriteToggle } = useFavorite({ id });

  return (
    <IconButton aria-label="favorite" onClick={handleFavoriteToggle}>
      <Favorite color={isFavorite ? 'primary' : 'disabled'} />
    </IconButton>
  );
}
