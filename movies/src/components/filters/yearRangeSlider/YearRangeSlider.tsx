import { useFilters } from '@/hooks/useFilters';
import { useFiltersDispatch } from '@/hooks/useFiltersDispatch';
import { Box, Slider, Typography } from '@mui/material';
import { FAVORITES_OPTION } from '../sortSelect/constants';

function YearRangeSlider() {
  const filtersState = useFilters();
  const filtersDispatch = useFiltersDispatch();

  const { searchQuery, sort } = filtersState;
  const isDisabled = Boolean(searchQuery || sort === FAVORITES_OPTION);

  const { min, max, range } = filtersState.yearRange;

  const handleYearRangeChange = (_event: Event, range: number | number[]) => {
    if (Array.isArray(range)) {
      filtersDispatch({
        type: 'changed_year_range',
        range: range,
      });
    }
  };

  return (
    !isDisabled && (
      <Box width="100%">
        <Typography gutterBottom>Year Range</Typography>
        <Slider
          min={min}
          max={max}
          value={range}
          onChange={handleYearRangeChange}
          valueLabelDisplay="on"
        />
      </Box>
    )
  );
}

export default YearRangeSlider;
