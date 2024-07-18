import { useFilters } from '@/hooks/useFilters';
import { useFiltersDispatch } from '@/hooks/useFiltersDispatch';
import { FormControl, FormControlLabel, Switch } from '@mui/material';

function FavoritesSwitch() {
  const filtersState = useFilters();
  const filtersDispatch = useFiltersDispatch();

  const { showFavorites } = filtersState;

  const handleSwitchShowFavorites = (event: React.ChangeEvent<HTMLInputElement>) => {
    const showFavorites = event.target.checked;

    filtersDispatch({
      type: 'switched_favorites',
      showFavorites,
    });
  };

  return (
    <FormControl component="form" variant="standard">
      <FormControlLabel
        control={<Switch checked={showFavorites} onChange={handleSwitchShowFavorites} />}
        label="Only Favorites"
      />
    </FormControl>
  );
}

export default FavoritesSwitch;
