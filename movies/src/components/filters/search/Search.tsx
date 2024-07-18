import { useState } from 'react';
import { FormControl, InputAdornment, TextField } from '@mui/material';
import { Close } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { useFiltersDispatch } from '@/hooks/useFiltersDispatch';
import { useDebouncedCallback } from 'use-debounce';

function Search() {
  const filtersDispatch = useFiltersDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSetSearchQuery = useDebouncedCallback((query) => {
    setSearchQuery(query);
    filtersDispatch({
      type: 'changed_search_query',
      searchQuery: query,
    });
  }, 400);

  const isEmptyQuery = searchQuery === '';

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentSearchQuery = event.currentTarget.value;
    setSearchQuery(currentSearchQuery);

    debouncedSetSearchQuery(currentSearchQuery);
  };

  const handleResetClick = () => {
    setSearchQuery('');

    filtersDispatch({
      type: 'changed_search_query',
      searchQuery: '',
    });
  };

  return (
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
  );
}

export default Search;
