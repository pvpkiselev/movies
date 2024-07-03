import Select from '@/components/common/select/Select';
import { useFilterContext, useFilterDispatchContext } from '@/contexts/filterContext/filterContext';
import { CHANGED_YEAR } from '@/reducers/constants';

const initialYearOptions = [
  { id: 0, value: 2024 },
  { id: 1, value: 2023 },
  { id: 2, value: 2022 },
  { id: 3, value: 2021 },
];

export default function YearSelect() {
  const filterState = useFilterContext();
  const dispatch = useFilterDispatchContext();

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: CHANGED_YEAR,
      year: e.target.value,
    });
  };

  return (
    <Select
      label="Год релиза"
      name="year"
      value={filterState.year}
      options={initialYearOptions}
      onChange={handleYearChange}
    />
  );
}
