import { POPULAR_OPTION } from '@/components/filters/sortSelect/constants';
import { createContext, Dispatch, ReactNode, useReducer } from 'react';
import { FiltersAction, FiltersState } from '@/types/filters/filtersContext.types';

interface FilterProviderProps {
  children: ReactNode;
}

type FilterContextType = FiltersState | null;
type FilterDispatchContextType = Dispatch<FiltersAction> | null;

const initialSort = POPULAR_OPTION;
const initialYearRange = { min: 1970, max: 2024, range: [1970, 2024] };

const initialFiltersState: FiltersState = {
  genreIds: [],
  sort: initialSort,
  yearRange: initialYearRange,
  favMoviesIds: [],
  currentPage: 1,
  maxPages: 500,
  searchQuery: '',
};

function filtersReducer(filtersState: FiltersState, action: FiltersAction) {
  switch (action.type) {
    case 'toggled_genres': {
      return {
        ...filtersState,
        genreIds: action.toggledGenresIds,
        currentPage: initialFiltersState.currentPage,
      };
    }
    case 'changed_sort': {
      if (filtersState.sort !== action.sort) {
        return {
          ...filtersState,
          sort: action.sort,
          currentPage: initialFiltersState.currentPage,
        };
      }
      return filtersState;
    }
    case 'changed_year_range': {
      return {
        ...filtersState,
        yearRange: { ...filtersState.yearRange, range: action.range },
        currentPage: initialFiltersState.currentPage,
      };
    }
    case 'changed_max_pages': {
      return {
        ...filtersState,
        maxPages: action.maxPages,
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
    case 'loaded_fav_movies_ids': {
      return {
        ...filtersState,
        favMoviesIds: action.favMoviesIds,
      };
    }
    case 'toggled_fav': {
      const newFavMoviesIds = filtersState.favMoviesIds.includes(action.favId)
        ? filtersState.favMoviesIds.filter((id) => id !== action.favId)
        : [...filtersState.favMoviesIds, action.favId];
      return {
        ...filtersState,
        favMoviesIds: newFavMoviesIds,
      };
    }
    case 'changed_search_query': {
      return {
        ...filtersState,
        searchQuery: action.searchQuery,
        currentPage: initialFiltersState.currentPage,
      };
    }
    case 'reset_filters': {
      return initialFiltersState;
    }
    default: {
      return filtersState;
    }
  }
}

const FilterContext = createContext<FilterContextType>(null);
const FilterDispatchContext = createContext<FilterDispatchContextType>(null);

export function FilterProvider({ children }: FilterProviderProps) {
  const [filtersState, dispatch] = useReducer(filtersReducer, initialFiltersState);
  return (
    <FilterContext.Provider value={filtersState}>
      <FilterDispatchContext.Provider value={dispatch}>{children}</FilterDispatchContext.Provider>
    </FilterContext.Provider>
  );
}

export { FilterContext, FilterDispatchContext };
