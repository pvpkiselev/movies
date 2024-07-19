import { useFilters } from '@/hooks/useFilters';
import { useFiltersDispatch } from '@/hooks/useFiltersDispatch';
import { Box, Slider, Typography } from '@mui/material';

function YearRangeSlider() {
  const filtersState = useFilters();
  const filtersDispatch = useFiltersDispatch();

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
  );
}

export default YearRangeSlider;
