import Select from '@/components/common/select/Select';
import { useFilterContext, useFilterDispatchContext } from '@/contexts/filterContext/filterContext';
import { CHANGED_SORT } from '@/reducers/constants';

const initialSortOptions = [
  { id: 0, value: 'Популярности' },
  { id: 1, value: 'Дате выхода' },
];

export default function SortSelect() {
  const filterState = useFilterContext();
  const dispatch = useFilterDispatchContext();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: CHANGED_SORT,
      sort: e.target.value,
    });
  };

  return (
    <Select
      label="Сортировать по"
      name="sort"
      value={filterState.sort}
      options={initialSortOptions}
      onChange={handleSortChange}
    />
  );
}
