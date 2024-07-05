import { useFilterContext, useFilterDispatchContext } from '@/contexts/filterContext/filterContext';
import { POPULAR_OPTION, TOP_RATED_OPTION } from './constants';
import Select from '@/components/common/select/Select';

const sortOptions = [
  { id: 0, value: POPULAR_OPTION },
  { id: 1, value: TOP_RATED_OPTION },
];

function SortSelect() {
  const filterState = useFilterContext();
  const dispatch = useFilterDispatchContext();

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
      value={filterState.sort}
      options={sortOptions}
      onChange={handleSortChange}
    />
  );
}

export default SortSelect;
