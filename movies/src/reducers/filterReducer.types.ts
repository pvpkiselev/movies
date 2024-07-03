import {
  CHANGED_SORT,
  CHANGED_YEAR,
  LOADED_GENRES,
  RESET_FILTERS,
  TOGGLED_GENRE,
} from './constants';

export type Genre = {
  id: number;
  name: string;
  checked: boolean;
};

export type FiltersState = {
  genres: Genre[];
  sort: string;
  year: string;
};

export type LOADED_GENRES_ACTION = {
  type: typeof LOADED_GENRES;
  genres: Genre[];
};

export type TOGGLED_GENRE_ACTION = {
  type: typeof TOGGLED_GENRE;
  id: number;
};

export type CHANGED_SORT_ACTION = {
  type: typeof CHANGED_SORT;
  sort: string;
};

export type CHANGED_YEAR_ACTION = {
  type: typeof CHANGED_YEAR;
  year: string;
};

export type RESET_FILTERS_ACTION = {
  type: typeof RESET_FILTERS;
};

export type Action =
  | LOADED_GENRES_ACTION
  | TOGGLED_GENRE_ACTION
  | CHANGED_SORT_ACTION
  | CHANGED_YEAR_ACTION
  | RESET_FILTERS_ACTION;
