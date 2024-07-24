import { useMemo, useState } from 'react';
import { Box, Slider, Typography } from '@mui/material';
import { FAVORITES_OPTION } from '../sortSelect/constants';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { changeYearRange } from '@/store/filters/filtersActions';
import { useDebouncedCallback } from 'use-debounce';
import { selectSortAndSearchValues } from '@/store/filters/filtersSelectors';

const yearRangeMin = 1970;
const yearRangeMax = 2024;

function YearRangeSlider() {
  const dispatch = useAppDispatch();
  const { sortType, searchQuery } = useAppSelector(selectSortAndSearchValues);
  const [localRange, setLocalRange] = useState<number | number[]>([yearRangeMin, yearRangeMax]);

  const isDisabled = useMemo(
    () => Boolean(searchQuery || sortType === FAVORITES_OPTION),
    [searchQuery, sortType]
  );

  const handleRangeDispatch = useDebouncedCallback((range: number[]) => {
    dispatch(changeYearRange(range));
  }, 300);

  const handleYearRangeChange = (_event: Event, range: number | number[]) => {
    if (Array.isArray(range)) {
      setLocalRange(range);
      handleRangeDispatch(range);
    }
  };

  return (
    !isDisabled && (
      <Box width="100%">
        <Typography gutterBottom>Year Range</Typography>
        <Slider
          min={yearRangeMin}
          max={yearRangeMax}
          value={localRange}
          onChange={handleYearRangeChange}
          valueLabelDisplay="on"
        />
      </Box>
    )
  );
}

export default YearRangeSlider;
