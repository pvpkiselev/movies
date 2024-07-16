import { useContext } from 'react';
import { FilterDispatchContext } from '@/contexts/filterContext/filterProvider';
import { ContextError } from '@/errors/contextError';

export const useFiltersDispatch = () => {
  const filterDispatchContext = useContext(FilterDispatchContext);
  if (!filterDispatchContext) {
    throw new ContextError('useFilterDispatchContext must be used within a FilterProvider');
  }
  return filterDispatchContext;
};
