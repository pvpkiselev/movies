import { useState } from 'react';
import { Box, Slider, Typography } from '@mui/material';

import { FAVORITES_OPTION } from '../sortSelect/constants';
import { useAppDispatch, useAppSelector } from '@/store/redux';
import { changedYearRange } from '@/store/filters/slices/yearRangeSlice';
import { selectSearchQuery, selectSortType } from '@/store/filters/selectors/filtersSelectors';
import { yearRangeMax, yearRangeMin } from '@/helpers/constants';

function YearRangeSlider() {
  const dispatch = useAppDispatch();
  const sortType = useAppSelector(selectSortType);
  const searchQuery = useAppSelector(selectSearchQuery);
  const [localRange, setLocalRange] = useState<number[]>([yearRangeMin, yearRangeMax]);

  const isDisabled = Boolean(searchQuery || sortType === FAVORITES_OPTION);

  const handleRangeDispatch = () => {
    dispatch(changedYearRange(localRange));
  };

  const handleYearRangeChange = (_event: Event, range: number | number[]) => {
    if (Array.isArray(range)) {
      setLocalRange(range);
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
          onChangeCommitted={handleRangeDispatch}
          valueLabelDisplay="on"
        />
      </Box>
    )
  );
}

export default YearRangeSlider;
