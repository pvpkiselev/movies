import { useMemo } from 'react';
import { Box, Slider, Typography } from '@mui/material';
import { FAVORITES_OPTION } from '../sortSelect/constants';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  selectSearchQuery,
  selectSortType,
  selectYearRange,
} from '@/store/filters/filtersSelectors';
import { changeYearRange } from '@/store/filters/filtersActions';

function YearRangeSlider() {
  const dispatch = useAppDispatch();
  const sort = useAppSelector(selectSortType);
  const searchQuery = useAppSelector(selectSearchQuery);
  const yearRange = useAppSelector(selectYearRange);

  const isDisabled = useMemo(
    () => Boolean(searchQuery || sort === FAVORITES_OPTION),
    [searchQuery, sort]
  );

  const { min, max, range } = yearRange;

  const handleYearRangeChange = (_event: Event, range: number | number[]) => {
    if (Array.isArray(range)) {
      dispatch(changeYearRange(range));
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
