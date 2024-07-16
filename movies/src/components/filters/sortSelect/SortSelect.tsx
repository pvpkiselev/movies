import { POPULAR_OPTION, TOP_RATED_OPTION } from './constants';
import Select from '@/components/common/select/Select';
import { useFilters } from '@/hooks/useFilters';
import { useFiltersDispatch } from '@/hooks/useFiltersDispatch';

const sortOptions = [
  { id: 0, value: POPULAR_OPTION },
  { id: 1, value: TOP_RATED_OPTION },
];

function SortSelect() {
  const filtersState = useFilters();
  const dispatch = useFiltersDispatch();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: 'changed_sort',
      sort: e.target.value,
    });
  };

  return (
    <Select
      label="Sort by"
      name="sort"
      id="sort"
      value={filtersState.sort}
      options={sortOptions}
      onChange={handleSortChange}
    />
  );
}

export default SortSelect;
