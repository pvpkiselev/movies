import { POPULAR_OPTION, TOP_RATED_OPTION } from './constants';
import { useFilters } from '@/hooks/useFilters';
import { useFiltersDispatch } from '@/hooks/useFiltersDispatch';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

const sortOptions = [
  { id: 0, value: POPULAR_OPTION },
  { id: 1, value: TOP_RATED_OPTION },
];

function SortSelect() {
  const filtersState = useFilters();
  const dispatch = useFiltersDispatch();

  const handleSortChange = (event: SelectChangeEvent) => {
    dispatch({
      type: 'changed_sort',
      sort: event.target.value,
    });
  };

  return (
    <FormControl variant="standard" fullWidth>
      <InputLabel variant="standard" htmlFor="sort">
        Sort by
      </InputLabel>
      <Select
        name="sort"
        id="sort"
        labelId="sort"
        value={filtersState.sort}
        onChange={handleSortChange}
      >
        {sortOptions.map((option) => (
          <MenuItem key={option.id} value={option.value}>
            {option.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SortSelect;
