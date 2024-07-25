import { resetFilters } from '@/store/filtersSlice';
import { useAppDispatch } from '@/store/store';
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
