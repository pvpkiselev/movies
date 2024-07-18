import { useEffect } from 'react';
import getGenresData from '@/api/movies/getGenresData';
import { Autocomplete, TextField } from '@mui/material';
import { useFilters } from '@/hooks/useFilters';
import { useFiltersDispatch } from '@/hooks/useFiltersDispatch';
import { Genre } from '@/types/filters/genres.types';

function Genres() {
  const filtersState = useFilters();
  const dispatch = useFiltersDispatch();

  useEffect(() => {
    let ignoreFetch = false;

    async function fetchGenres() {
      try {
        const response = await getGenresData();
        const genres = response.genres.map((genre: Genre) => ({
          ...genre,
          checked: false,
        })) as Genre[];

        if (!ignoreFetch) {
          dispatch({
            type: 'loaded_genres',
            genres,
          });
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchGenres();

    return () => {
      ignoreFetch = true;
    };
  }, []);

  const handleGenreToggle = (event: React.SyntheticEvent, value: string[]) => {
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
