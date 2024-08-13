import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { FAVORITES_OPTION, POPULAR_OPTION, TOP_RATED_OPTION } from './constants';
import { useAppDispatch, useAppSelector } from '@/store/redux';
import { changedSortType } from '@/store/filters/slices/sortSlice';
import { selectSearchQuery, selectSortType } from '@/store/filters/selectors/filtersSelectors';

const sortOptions = [
  { id: 0, value: POPULAR_OPTION },
  { id: 1, value: TOP_RATED_OPTION },
  { id: 2, value: FAVORITES_OPTION },
];

function SortSelect() {
  const dispatch = useAppDispatch();
  const sortType = useAppSelector(selectSortType);
  const searchQuery = useAppSelector(selectSearchQuery);

  const isDisabled = Boolean(searchQuery);

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
