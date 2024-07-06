import { Dispatch, createContext, useContext } from 'react';
import { Action, FiltersState } from '@/types/reducer.types';
import { ContextError } from '@/errors/contextError';

export const FilterContext = createContext<FiltersState | null>(null);
export const FilterDispatchContext = createContext<Dispatch<Action> | null>(null);

export const useFilterContext = () => {
  const filterContext = useContext(FilterContext);
  if (!filterContext) {
    throw new ContextError('useFilterContext must be used within a FilterProvider');
  }
  return filterContext;
};

export const useFilterDispatchContext = () => {
  const filterDispatchContext = useContext(FilterDispatchContext);
  if (!filterDispatchContext) {
    throw new ContextError('useFilterDispatchContext must be used within a FilterProvider');
  }
  return filterDispatchContext;
};
