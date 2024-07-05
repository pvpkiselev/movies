import RangeSlider from '@/components/common/rangeSlider/RangeSlider';
import { useFilterContext, useFilterDispatchContext } from '@/contexts/filterContext/filterContext';

function YearRangeSlider() {
  const filterState = useFilterContext();
  const dispatch = useFilterDispatchContext();

  const handleYearRangeChange = (newRange: number[]) => {
    dispatch({
      type: 'changed_year_range',
      range: newRange,
    });
  };

  return (
    <RangeSlider
      label="Year Range"
      min={filterState.yearRange.min}
      max={filterState.yearRange.max}
      range={filterState.yearRange.range}
      valueLabelDisplay="on"
      onChange={handleYearRangeChange}
    />
  );
}

export default YearRangeSlider;
