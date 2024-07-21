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
  genres: [],
  sort: initialSort,
  yearRange: initialYearRange,
  movies: {
    sorted: [],
    favorites: [],
  },
  currentPage: 1,
  maxPages: 1,
  searchQuery: '',
};

function filtersReducer(filtersState: FiltersState, action: FiltersAction) {
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
        movies: {
          ...filtersState.movies,
          sorted: action.movies,
        },
        currentPage: action.currentPage,
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
    case 'loaded_favorite_movies': {
      return {
        ...filtersState,
        movies: {
          ...filtersState.movies,
          favorites: action.favorites,
        },
        ...(action.currentPage !== undefined && { currentPage: action.currentPage }),
        ...(action.maxPages !== undefined && { maxPages: action.maxPages }),
      };
    }
    case 'switched_favorites': {
      return {
        ...filtersState,
        showFavorites: action.showFavorites,
      };
    }
    case 'changed_search_query': {
      return {
        ...filtersState,
        searchQuery: action.searchQuery,
      };
    }
    case 'reset_filters': {
      return {
        ...filtersState,
        currentPage: 1,
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
