import { POPULAR_OPTION } from '@/components/filters/sortSelect/constants';
import { FiltersState } from './reducer.types';
import { YearRange } from '@/components/filters/yearRangeSlider/yearRange.types';

export const initialSort = POPULAR_OPTION;
export const initialYearRange = { min: 1950, max: 2024, range: [1970, 2020] } as YearRange;

export const initialFiltersState: FiltersState = {
  genres: [],
  sort: initialSort,
  yearRange: initialYearRange,
  movies: [],
  currentPage: 1,
};
