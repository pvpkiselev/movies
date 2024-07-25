import { resetFilters } from '@/store/filters/filtersSlice';
import { useAppDispatch } from '@/store/redux';
import { Close } from '@mui/icons-material';
import { Button } from '@mui/material';

function ResetButton() {
  const dispatch = useAppDispatch();

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  return (
    <Button variant="outlined" startIcon={<Close />} onClick={handleResetFilters} disableElevation>
      Reset filters
    </Button>
  );
}

export default ResetButton;
