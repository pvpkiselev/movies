import { initialSort, initialYear } from './constants';
import { FiltersState } from './filterReducer.types';

export const initialFiltersState: FiltersState = {
  genres: [],
  sort: initialSort,
  year: initialYear,
};
