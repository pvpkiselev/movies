import { YearRange } from '@/types/filters/yearRange.types';

export type FiltersState = {
  genreIds: number[];
  sort: string;
  yearRange: YearRange;
  favMoviesIds: number[];
  currentPage: number;
  maxPages: number;
  searchQuery: string;
};

export type TOGGLED_GENRE_ACTION = {
  type: 'toggled_genres';
  toggledGenresIds: number[];
};

export type CHANGED_SORT_ACTION = {
  type: 'changed_sort';
  sort: string;
};

export type CHANGED_YEAR_RANGE_ACTION = {
  type: 'changed_year_range';
  range: number[];
};

export type CHANGED_MAX_PAGES_ACTION = {
  type: 'changed_max_pages';
  maxPages: number;
};

export type PAGE_SELECTED_ACTION = {
  type: 'page_selected';
  currentPage: number;
};

export type LOADED_FAVORITE_MOVIES_IDS = {
  type: 'loaded_fav_movies_ids';
  favMoviesIds: number[];
};

export type CHANGED_SEARCH_QUERY = {
  type: 'changed_search_query';
  searchQuery: string;
};

export type RESET_FILTERS_ACTION = {
  type: 'reset_filters';
};

export type FiltersAction =
  | TOGGLED_GENRE_ACTION
  | CHANGED_SORT_ACTION
  | CHANGED_YEAR_RANGE_ACTION
  | CHANGED_MAX_PAGES_ACTION
  | PAGE_SELECTED_ACTION
  | RESET_FILTERS_ACTION
  | LOADED_FAVORITE_MOVIES_IDS
  | CHANGED_SEARCH_QUERY;
