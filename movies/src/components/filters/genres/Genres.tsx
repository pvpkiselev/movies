import { useCallback, useEffect, useMemo } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { FAVORITES_OPTION } from '../sortSelect/constants';
import { selectGenresValues } from '@/store/filters/filtersSelectors';
import { Genre } from './types/genres.types';
import { toggledGenres } from '@/store/filters/filtersSlice';
import { useAppDispatch, useAppSelector } from '@/store/redux';
import { fetchGenresDataAction } from '@/store/filters/model/fetchGenresDataAction';

function Genres() {
  const dispatch = useAppDispatch();
  const { sortType, searchQuery, genres, genreIds, checkedGenres } =
    useAppSelector(selectGenresValues);

  const isDisabled = useMemo(
    () => Boolean(searchQuery || sortType === FAVORITES_OPTION),
    [searchQuery, sortType]
  );

  useEffect(() => {
    dispatch(fetchGenresDataAction());
  }, []);

  const handleGenreToggle = (_event: React.SyntheticEvent, value: number[]) => {
    dispatch(toggledGenres(value));
  };

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
        options={genreIds}
        getOptionLabel={getOptionLabel}
        value={checkedGenres}
        onChange={handleGenreToggle}
        renderInput={(params) => <TextField {...params} variant="standard" label="Genres" />}
        fullWidth
      />
    )
  );
}

export default Genres;
