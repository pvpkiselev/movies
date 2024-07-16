import { createContext, Dispatch, ReactNode, useReducer } from 'react';
import { filtersReducer, initialFiltersState } from './filtersReducer';
import { Action, FiltersState } from '@/types/filters/reducer.types';

interface FilterProviderProps {
  children: ReactNode;
}

type FilterContextType = FiltersState | null;
type FilterDispatchContextType = Dispatch<Action> | null;

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
