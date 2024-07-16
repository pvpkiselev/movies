import { useFiltersDispatch } from '@/hooks/useFiltersDispatch';
import { Close } from '@mui/icons-material';
import { Button } from '@mui/material';

function ResetButton() {
  const dispatch = useFiltersDispatch();

  const handleResetFilters = () => {
    dispatch({
      type: 'reset_filters',
    });
  };

  return (
    <Button variant="outlined" startIcon={<Close />} onClick={handleResetFilters} disableElevation>
      Reset filters
    </Button>
  );
}

export default ResetButton;
