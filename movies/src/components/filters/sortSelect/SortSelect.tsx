import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { FAVORITES_OPTION, POPULAR_OPTION, TOP_RATED_OPTION } from './constants';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { selectSortAndSearchValues } from '@/store/filters/filtersSelectors';
import { changedSortType } from '@/store/filtersSlice';

const sortOptions = [
  { id: 0, value: POPULAR_OPTION },
  { id: 1, value: TOP_RATED_OPTION },
  { id: 2, value: FAVORITES_OPTION },
];

function SortSelect() {
  const dispatch = useAppDispatch();
  const { sortType, searchQuery } = useAppSelector(selectSortAndSearchValues);

  const isDisabled = useMemo(() => Boolean(searchQuery), [searchQuery]);

  const handleSortChange = (event: SelectChangeEvent) => {
    const sortType = event.target.value;
    dispatch(changedSortType(sortType));
  };

  return (
    !isDisabled && (
      <FormControl variant="standard" fullWidth>
        <InputLabel variant="standard" htmlFor="sort">
          Sort by
        </InputLabel>
        <Select name="sort" id="sort" labelId="sort" value={sortType} onChange={handleSortChange}>
          {sortOptions.map((option) => (
            <MenuItem key={option.id} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  );
}

export default SortSelect;
