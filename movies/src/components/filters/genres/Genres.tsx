import { useCallback, useEffect, useMemo, useState } from 'react';
import getGenresData from '@/api/movies/getGenresData';
import { Autocomplete, TextField } from '@mui/material';
import { FAVORITES_OPTION } from '../sortSelect/constants';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { selectGenresValues } from '@/store/filters/filtersSelectors';
import { Genre } from './types/genres.types';
import { toggledGenres } from '@/store/filtersSlice';

function Genres() {
  const dispatch = useAppDispatch();
  const { sortType, searchQuery, genreIds } = useAppSelector(selectGenresValues);
  const [genres, setGenres] = useState<Genre[]>([]);

  const isDisabled = useMemo(
    () => Boolean(searchQuery || sortType === FAVORITES_OPTION),
    [searchQuery, sortType]
  );

  const fetchGenres = useCallback(async () => {
    try {
      const response = await getGenresData();
      const genres = response.genres;

      setGenres(genres);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);

  const handleGenreToggle = (_event: React.SyntheticEvent, value: number[]) => {
    dispatch(toggledGenres(value));
  };

  const optionIds = useMemo(() => {
    return genres.map((genre) => genre.id);
  }, [genres]);

  const selectedGenres = useMemo(() => {
    return genres.filter((genre) => genreIds.includes(genre.id)).map((genre) => genre.id);
  }, [genreIds, genres]);

  const getOptionLabel = useCallback(
    (option: Genre['id']): string => {
      const genre = genres.find((genre) => genre.id === option);
      return genre ? genre.name : '';
    },
    [genres]
  );

  return (
    !isDisabled && (
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
        fullWidth
      />
    )
  );
}

export default Genres;
