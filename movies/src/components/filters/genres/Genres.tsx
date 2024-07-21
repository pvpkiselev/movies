import { useCallback, useEffect } from 'react';
import getGenresData from '@/api/movies/getGenresData';
import { Autocomplete, TextField } from '@mui/material';
import { useFilters } from '@/hooks/useFilters';
import { useFiltersDispatch } from '@/hooks/useFiltersDispatch';

function Genres() {
  const filtersState = useFilters();
  const dispatch = useFiltersDispatch();

  const fetchGenres = useCallback(
    async (ignoreFetch: boolean) => {
      try {
        const response = await getGenresData();
        const genres = response.genres.map((genre) => ({
          ...genre,
          checked: false,
        }));

        if (!ignoreFetch) {
          dispatch({
            type: 'loaded_genres',
            genres,
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    let ignoreFetch = false;
    fetchGenres(ignoreFetch);
    return () => {
      ignoreFetch = true;
    };
  }, [fetchGenres]);

  const handleGenreToggle = (_event: React.SyntheticEvent, value: string[]) => {
    dispatch({
      type: 'toggled_genre',
      selectedGenres: value,
    });
  };

  const optionNames = filtersState.genres.map((genre) => genre.name);
  const selectedNames = filtersState.genres
    .filter((genre) => genre.checked)
    .map((genre) => genre.name);

  return (
    <Autocomplete
      multiple
      limitTags={2}
      disableCloseOnSelect
      id="genres"
      options={optionNames}
      getOptionLabel={(option) => option}
      value={selectedNames}
      onChange={handleGenreToggle}
      renderInput={(params) => <TextField {...params} variant="standard" label="Genres" />}
      sx={{ width: '100%' }}
    />
  );
}

export default Genres;
