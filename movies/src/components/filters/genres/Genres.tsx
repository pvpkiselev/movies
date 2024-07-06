import { useEffect } from 'react';
import { useFilterContext, useFilterDispatchContext } from '@/contexts/filterContext/filterContext';
import getGenresData from '@/api/getGenresData';
import { Autocomplete, TextField } from '@mui/material';
import { Genre } from '../../../types/genres.types';

function Genres() {
  const filtersState = useFilterContext();
  const dispatch = useFilterDispatchContext();

  useEffect(() => {
    let ignoreFetch = false;

    async function fetchGenres() {
      const response = await getGenresData();
      const newGenres = response.genres.map((genre: Genre) => ({
        ...genre,
        checked: false,
      })) as Genre[];

      if (!ignoreFetch) {
        dispatch({
          type: 'loaded_genres',
          genres: newGenres,
        });
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
