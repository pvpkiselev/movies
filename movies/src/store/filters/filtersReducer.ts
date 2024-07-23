import { POPULAR_OPTION } from '@/components/filters/sortSelect/constants';
import {
  CHANGED_MAX_PAGES,
  CHANGED_SEARCH_QUERY,
  CHANGED_SORT_TYPE,
  CHANGED_YEAR_RANGE,
  FILTERS_ACTION,
  LOADED_FAVORITE_MOVIES_IDS,
  PAGE_SELECTED,
  RESET_FILTERS,
  TOGGLED_FAVORITE,
  TOGGLED_GENRES,
} from './filtersActions';

export type YearRange = {
  min: number;
  max: number;
  range: number[];
};

type FiltersState = {
  genreIds: number[];
  sortType: string;
  yearRange: YearRange;
  favMoviesIds: number[];
  currentPage: number;
  maxPages: number;
  searchQuery: string;
};

const initialSort = POPULAR_OPTION;
const initialYearRange = { min: 1970, max: 2024, range: [1970, 2024] };

const filtersInitialState: FiltersState = {
  genreIds: [],
  sortType: initialSort,
  yearRange: initialYearRange,
  favMoviesIds: [],
  currentPage: 1,
  maxPages: 500,
  searchQuery: '',
};

export function filtersReducer(
  filtersState: FiltersState = filtersInitialState,
  action: FILTERS_ACTION
) {
  switch (action.type) {
    case TOGGLED_GENRES: {
      return {
        ...filtersState,
        genreIds: action.genreIds,
        currentPage: filtersInitialState.currentPage,
      };
    }
    case CHANGED_SORT_TYPE: {
      if (filtersState.sortType !== action.sortType) {
        return {
          ...filtersState,
          sortType: action.sortType,
          currentPage: filtersInitialState.currentPage,
        };
      }
      return filtersState;
    }
    case CHANGED_YEAR_RANGE: {
      return {
        ...filtersState,
        yearRange: { ...filtersState.yearRange, range: action.range },
        currentPage: filtersInitialState.currentPage,
      };
    }
    case CHANGED_MAX_PAGES: {
      return {
        ...filtersState,
        maxPages: action.maxPages,
      };
    }
    case PAGE_SELECTED: {
      if (filtersState.currentPage !== action.currentPage) {
        return {
          ...filtersState,
          currentPage: action.currentPage,
        };
      }
      return filtersState;
    }
    case LOADED_FAVORITE_MOVIES_IDS: {
      return {
        ...filtersState,
        favMoviesIds: action.favMoviesIds,
      };
    }
    case TOGGLED_FAVORITE: {
      const newFavMoviesIds = filtersState.favMoviesIds.includes(action.favId)
        ? filtersState.favMoviesIds.filter((id) => id !== action.favId)
        : [...filtersState.favMoviesIds, action.favId];
      return {
        ...filtersState,
        favMoviesIds: newFavMoviesIds,
      };
    }
    case CHANGED_SEARCH_QUERY: {
      return {
        ...filtersState,
        searchQuery: action.searchQuery,
        currentPage: filtersInitialState.currentPage,
      };
    }
    case RESET_FILTERS: {
      return filtersInitialState;
    }
    default: {
      return filtersState;
    }
  }
}
