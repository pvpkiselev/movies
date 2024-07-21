import { useCallback, useEffect, useState } from 'react';
import getGenresData from '@/api/movies/getGenresData';
import { Autocomplete, TextField } from '@mui/material';
import { useFilters } from '@/hooks/useFilters';
import { useFiltersDispatch } from '@/hooks/useFiltersDispatch';
import { Genre } from '@/types/filters/genres.types';

function Genres() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const filtersState = useFilters();
  const dispatch = useFiltersDispatch();

  const fetchGenres = useCallback(
    async (ignoreFetch: boolean) => {
      try {
        const response = await getGenresData();
        const genres = response.genres;

        if (!ignoreFetch) {
          setGenres(genres);
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

  const handleGenreToggle = (_event: React.SyntheticEvent, value: number[]) => {
    dispatch({
      type: 'toggled_genres',
      toggledGenresIds: value,
    });
  };

  const optionIds = genres.map((genre) => genre.id);
  const selectedGenres = genres
    .filter((genre) => filtersState.genreIds.includes(genre.id))
    .map((genre) => genre.id);

  function getOptionLabel(option: Genre['id']): string {
    const genreName = genres.find((genre) => genre.id === option);
    return genreName ? genreName.name : '';
  }

  return (
    <Autocomplete
      multiple
      limitTags={2}
      disableCloseOnSelect
      id="genres"
      options={optionIds}
      getOptionLabel={getOptionLabel}
      value={selectedGenres}
      onChange={handleGenreToggle}
      renderInput={(params) => <TextField {...params} variant="standard" label="Genres" />}
      sx={{ width: '100%' }}
    />
  );
}

export default Genres;
