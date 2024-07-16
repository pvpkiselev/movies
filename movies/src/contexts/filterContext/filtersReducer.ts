import { YearRange } from '@/types/filters/yearRange.types';
import { Action, FiltersState } from '../../types/filters/reducer.types';
import { POPULAR_OPTION } from '@/components/filters/sortSelect/constants';

export const initialSort = POPULAR_OPTION;
export const initialYearRange: YearRange = { min: 1950, max: 2024, range: [1950, 2024] };

export const initialFiltersState: FiltersState = {
  genres: [],
  sort: initialSort,
  yearRange: initialYearRange,
  movies: [],
  currentPage: 1,
};

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
      if (filtersState.sort !== action.sort) {
        return {
          ...filtersState,
          sort: action.sort,
        };
      }
      return filtersState;
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
      if (filtersState.currentPage !== action.currentPage) {
        return {
          ...filtersState,
          currentPage: action.currentPage,
        };
      }
      return filtersState;
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
