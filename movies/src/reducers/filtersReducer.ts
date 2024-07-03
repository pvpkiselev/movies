import {
  CHANGED_SORT,
  CHANGED_YEAR,
  LOADED_GENRES,
  RESET_FILTERS,
  TOGGLED_GENRE,
} from './constants';
import { Action, FiltersState } from './filterReducer.types';
import { initialFiltersState } from './initialStates';

export function filtersReducer(filtersState: FiltersState, action: Action) {
  switch (action.type) {
    case LOADED_GENRES: {
      return { ...filtersState, genres: action.genres };
    }
    case TOGGLED_GENRE: {
      return {
        ...filtersState,
        genres: filtersState.genres.map((genre) =>
          action.id === genre.id ? { ...genre, checked: !genre.checked } : genre
        ),
      };
    }
    case CHANGED_SORT: {
      return {
        ...filtersState,
        sort: action.sort,
      };
    }
    case CHANGED_YEAR: {
      return {
        ...filtersState,
        year: action.year,
      };
    }
    case RESET_FILTERS: {
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
