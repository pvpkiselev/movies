import { POPULAR_OPTION } from '@/components/filters/sortSelect/constants';
import { FiltersState } from '../types/reducer.types';
import { YearRange } from '@/types/yearRange.types';

export const initialSort = POPULAR_OPTION;
export const initialYearRange = { min: 1950, max: 2024, range: [1950, 2024] } as YearRange;

export const initialFiltersState: FiltersState = {
  genres: [],
  sort: initialSort,
  yearRange: initialYearRange,
  movies: [],
  currentPage: 1,
};
