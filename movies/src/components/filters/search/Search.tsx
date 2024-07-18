import { useEffect, useState } from 'react';
import { FormControl, InputAdornment, TextField } from '@mui/material';
import { Close } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import getSearchMovie from '@/api/getSearchMovie';
import { useFiltersDispatch } from '@/hooks/useFiltersDispatch';
import { debounce } from '@/helpers/debounce';
import { useFilters } from '@/hooks/useFilters';

function Search() {
  const filtersState = useFilters();
  const filtersDispatch = useFiltersDispatch();
  const [searchQuery, setSearchQuery] = useState('');

  const isEmptyQuery = searchQuery === '';

  useEffect(() => {
    const abortController = new AbortController();

    const handleSearchRequest = async () => {
      try {
        const currentPage = filtersState.currentPage;

        const response = await getSearchMovie(searchQuery, currentPage, abortController.signal);

        if (response) {
          filtersDispatch({
            type: 'loaded_searched_movies',
            searchedMovies: response.results,
            currentPage: response.page,
          });
        }
      } catch (error) {
        setSearchQuery('');
        console.error('Failed to Search:', error);
      }
    };

    const debouncedSearchRequest = debounce(handleSearchRequest, 300);

    if (!isEmptyQuery) {
      debouncedSearchRequest();
    }

    return () => {
      abortController.abort();
    };
  }, [filtersState.currentPage, searchQuery, filtersDispatch]);

  // const handleSearchRequest = async (query: string) => {
  //   try {
  //     const currentPage = filtersState.currentPage;

  //     const response = await getSearchMovie(query, currentPage);

  //     if (response) {
  //       filtersDispatch({
  //         type: 'loaded_movies',
  //         movies: response.results,
  //         currentPage: response.page,
  //       });
  //     }
  //   } catch (error) {
  //     setSearchQuery('');
  //     console.error('Failed to Search:', error);
  //   }
  // };

  // const debouncedSearchRequest = debounce(handleSearchRequest, 300);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value;
    setSearchQuery(inputValue);

    // debouncedSearchRequest(inputValue);
  };

  // const handleSearchChange = async () => {
  //   try {
  //     const response = await getSearchMovie(searchQuery);

  //     if (response) {
  //       filtersDispatch({
  //         type: 'loaded_movies',
  //         movies: response.results,
  //         currentPage: response.page,
  //       });
  //     }
  //   } catch (error) {
  //     setSearchQuery('');
  //     console.error('Failed to Search:', error);
  //   }
  // };

  // const debouncedSearchChange = debounce(handleSearchChange, 300);

  const handleResetClick = () => {
    setSearchQuery('');
    filtersDispatch({
      type: 'reset_filters',
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
