import { useEffect } from 'react';
import styles from './GenreCheckboxGroup.module.scss';
import Checkbox from '@components/common/checkbox/Checkbox';
import { useFilterContext, useFilterDispatchContext } from '@/contexts/filterContext/filterContext';
import getGenresData from '@/api/getGenresData';
import { Genre } from '@/reducers/filterReducer.types';
import { LOADED_GENRES, TOGGLED_GENRE } from '@/reducers/constants';

export default function GenreCheckboxGroup() {
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
          type: LOADED_GENRES,
          genres: newGenres,
        });
      }
    }

    fetchGenres();

    return () => {
      ignoreFetch = true;
    };
  }, []);

  const handleGenreToggle = (id: number) => {
    dispatch({
      type: TOGGLED_GENRE,
      id: id,
    });
  };

  return (
    <div className={styles.checkboxGroup}>
      <h4 className={styles.title}>Жанры</h4>
      <ul className={styles.list}>
        {filtersState.genres.map((genre) => (
          <li key={genre.id}>
            <Checkbox
              value={genre.name}
              checked={genre.checked}
              onChange={() => handleGenreToggle(genre.id)}
            >
              {genre.name}
            </Checkbox>
          </li>
        ))}
      </ul>
    </div>
  );
}
