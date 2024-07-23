import { useMemo } from 'react';
import { FormControl, InputAdornment, TextField } from '@mui/material';
import { Close } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { FAVORITES_OPTION } from '../sortSelect/constants';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { selectSearchQuery, selectSortType } from '@/store/filters/filtersSelectors';
import { changeSearchQuery } from '@/store/filters/filtersActions';

function Search() {
  const dispatch = useAppDispatch();
  const sortType = useAppSelector(selectSortType);
  const searchQuery = useAppSelector(selectSearchQuery);

  const isDisabled = useMemo(() => sortType === FAVORITES_OPTION, [sortType]);

  const isEmptyQuery = useMemo(() => searchQuery === '', [searchQuery]);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentSearchQuery = event.currentTarget.value;
    dispatch(changeSearchQuery(currentSearchQuery));
  };

  const handleResetClick = () => {
    dispatch(changeSearchQuery(''));
  };

  return (
    !isDisabled && (
      <FormControl>
        <TextField
          size="medium"
          variant="standard"
          onChange={handleQueryChange}
          value={searchQuery}
          placeholder="Search movies"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end" onClick={handleResetClick}>
                {!isEmptyQuery && <Close />}
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
    )
  );
}

export default Search;
