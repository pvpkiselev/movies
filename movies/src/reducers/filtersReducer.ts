import { Action, FiltersState } from '../types/reducer.types';
import { initialFiltersState } from './initialState';

export function filtersReducer(filtersState: FiltersState, action: Action) {
  switch (action.type) {
    case 'loaded_genres': {
      return { ...filtersState, genres: action.genres };
    }
    case 'toggled_genre': {
      const selectedGenresSet = new Set(action.selectedGenres);
      const updatedGenres = filtersState.genres.map((genre) => ({
        ...genre,
        checked: selectedGenresSet.has(genre.name),
      }));
      return {
        ...filtersState,
        genres: updatedGenres,
      };
    }
    case 'changed_sort': {
      return {
        ...filtersState,
        sort: action.sort,
      };
    }
    case 'changed_year_range': {
      return {
        ...filtersState,
        yearRange: { ...filtersState.yearRange, range: action.range },
      };
    }
    case 'loaded_movies': {
      return {
        ...filtersState,
        movies: action.movies,
        currentPage: action.currentPage,
      };
    }
    case 'page_selected': {
      return {
        ...filtersState,
        currentPage: action.currentPage,
      };
    }
    case 'reset_filters': {
      return {
        ...initialFiltersState,
        genres: filtersState.genres.map((genre) => {
          return { ...genre, checked: false };
        }),
      };
    }
    default: {
      return filtersState;
    }
  }
}
