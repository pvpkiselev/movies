import { useContext } from 'react';
import { ContextError } from '@/errors/contextError';
import { FilterDispatchContext } from '@/contexts/filterContext/FilterProvider';

export const useFiltersDispatch = () => {
  const filterDispatchContext = useContext(FilterDispatchContext);
  if (!filterDispatchContext) {
    throw new ContextError('useFilterDispatchContext must be used within a FilterProvider');
  }
  return filterDispatchContext;
};
