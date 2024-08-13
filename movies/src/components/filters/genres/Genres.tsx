import { useCallback, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';

import { useAppDispatch, useAppSelector } from '@/store/redux';
import { fetchGenresDataAction } from '@/store/filters/actions/thunks/fetchGenresDataAction';
import { toggledGenres } from '@/store/filters/slices/genresSlice';
import {
  selectGenres,
  selectSearchQuery,
  selectSortType,
} from '@/store/filters/selectors/filtersSelectors';
import { FAVORITES_OPTION } from '../sortSelect/constants';
import { Genre } from './types/genres.types';

function Genres() {
  const dispatch = useAppDispatch();
  const sortType = useAppSelector(selectSortType);
  const searchQuery = useAppSelector(selectSearchQuery);
  const genres = useAppSelector(selectGenres);

  const genreIds = genres.map((genre) => genre.id);
  const checkedGenres = genres.filter((genre) => genre.checked).map((genre) => genre.id);
  const isDisabled = Boolean(searchQuery || sortType === FAVORITES_OPTION);

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
