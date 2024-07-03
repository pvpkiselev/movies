import { ReactNode, useReducer } from 'react';
import { filtersReducer } from '@/reducers/filtersReducer';
import { initialFiltersState } from '@/reducers/initialStates';
import { FilterContext, FilterDispatchContext } from './filterContext';

interface FilterProviderProps {
  children: ReactNode;
}

export function FilterProvider({ children }: FilterProviderProps) {
  const [filtersState, dispatch] = useReducer(filtersReducer, initialFiltersState);

  return (
    <FilterContext.Provider value={filtersState}>
      <FilterDispatchContext.Provider value={dispatch}>{children}</FilterDispatchContext.Provider>
    </FilterContext.Provider>
  );
}
