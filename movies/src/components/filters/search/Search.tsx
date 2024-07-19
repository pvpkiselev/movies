import { FormControl, InputAdornment, TextField } from '@mui/material';
import { Close } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { useFiltersDispatch } from '@/hooks/useFiltersDispatch';
import { useFilters } from '@/hooks/useFilters';

function Search() {
  const filtersState = useFilters();
  const filtersDispatch = useFiltersDispatch();

  const isEmptyQuery = filtersState.searchQuery === '';

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentSearchQuery = event.currentTarget.value;

    filtersDispatch({
      type: 'changed_search_query',
      searchQuery: currentSearchQuery,
    });
  };

  const handleResetClick = () => {
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
        value={filtersState.searchQuery}
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
