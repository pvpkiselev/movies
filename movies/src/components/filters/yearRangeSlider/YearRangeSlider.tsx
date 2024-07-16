import RangeSlider from '@/components/common/rangeSlider/RangeSlider';
import { useFilters } from '@/hooks/useFilters';
import { useFiltersDispatch } from '@/hooks/useFiltersDispatch';

function YearRangeSlider() {
  const filtersState = useFilters();
  const dispatch = useFiltersDispatch();

  const handleYearRangeChange = (newRange: number[]) => {
    dispatch({
      type: 'changed_year_range',
      range: newRange,
    });
  };

  return (
    <RangeSlider
      label="Year Range"
      min={filtersState.yearRange.min}
      max={filtersState.yearRange.max}
      range={filtersState.yearRange.range}
      valueLabelDisplay="on"
      onChange={handleYearRangeChange}
    />
  );
}

export default YearRangeSlider;
