import { FilterContext } from '@/contexts/filterContext/FilterProvider';
import { ContextError } from '@/errors/contextError';
import { useContext } from 'react';

export const useFilters = () => {
  const filterContext = useContext(FilterContext);
  if (!filterContext) {
    throw new ContextError('useFilterContext must be used within a FilterProvider');
  }
  return filterContext;
};
