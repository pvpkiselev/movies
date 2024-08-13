import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { FormControl, InputAdornment, TextField } from '@mui/material';
import { Close } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';

import { useAppDispatch, useAppSelector } from '@/store/redux';
import { changedSearchQuery } from '@/store/filters/slices/moviesSlice';
import { selectSortType } from '@/store/filters/selectors/filtersSelectors';
import { FAVORITES_OPTION } from '../sortSelect/constants';
import { callbackTime } from '@/helpers/constants';

function Search() {
  const dispatch = useAppDispatch();
  const sortType = useAppSelector(selectSortType);
  const [localQuery, setLocalQuery] = useState('');

  const isDisabled = sortType === FAVORITES_OPTION;

  const isEmptyQuery = localQuery === '';

  const handleSearchQueryDispatch = useDebouncedCallback((query: string) => {
    dispatch(changedSearchQuery(query));
  }, callbackTime);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentSearchQuery = event.currentTarget.value;
    setLocalQuery(currentSearchQuery);
    handleSearchQueryDispatch(currentSearchQuery);
  };

  const handleResetClick = () => {
    setLocalQuery('');
    dispatch(changedSearchQuery(''));
  };

  return (
    !isDisabled && (
      <FormControl>
        <TextField
          size="medium"
          variant="standard"
          onChange={handleQueryChange}
          value={localQuery}
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
