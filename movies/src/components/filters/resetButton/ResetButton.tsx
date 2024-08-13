import { Close } from '@mui/icons-material';
import { Button } from '@mui/material';

import { resetFiltersAction } from '@/store/filters/actions/resetFiltersAction';
import { useAppDispatch } from '@/store/redux';

function ResetButton() {
  const dispatch = useAppDispatch();

  const handleResetFilters = () => {
    dispatch(resetFiltersAction());
  };

  return (
    <Button variant="outlined" startIcon={<Close />} onClick={handleResetFilters} disableElevation>
      Reset filters
    </Button>
  );
}

export default ResetButton;
