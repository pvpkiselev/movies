import { useCallback, useEffect, useMemo, useState } from 'react';
import getGenresData from '@/api/movies/getGenresData';
import { Autocomplete, TextField } from '@mui/material';
import { Genre } from '@/types/filters/genres.types';
import { FAVORITES_OPTION } from '../sortSelect/constants';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  selectGenreIds,
  selectSearchQuery,
  selectSortType,
} from '@/store/filters/filtersSelectors';
import { toggleGenres } from '@/store/filters/filtersActions';

function Genres() {
  const dispatch = useAppDispatch();
  const sortType = useAppSelector(selectSortType);
  const searchQuery = useAppSelector(selectSearchQuery);
  const genreIds = useAppSelector(selectGenreIds);
  const [genres, setGenres] = useState<Genre[]>([]);

  const isDisabled = useMemo(
    () => Boolean(searchQuery || sortType === FAVORITES_OPTION),
    [searchQuery, sortType]
  );

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
    dispatch(toggleGenres(value));
  };

  const optionIds = genres.map((genre) => genre.id);

  const selectedGenres = useMemo(
    () => genres.filter((genre) => genreIds.includes(genre.id)).map((genre) => genre.id),
    [genreIds]
  );

  const getOptionLabel = (option: Genre['id']): string => {
    const genre = genres.find((genre) => genre.id === option);
    return genre ? genre.name : '';
  };

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
        sx={{ width: '100%' }}
      />
    )
  );
}

export default Genres;
