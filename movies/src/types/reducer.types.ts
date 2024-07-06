import { Genre } from '@/types/genres.types';
import { YearRange } from '@/types/yearRange.types';
import { Movie } from './movies.types';

export type FiltersState = {
  genres: Genre[];
  sort: string;
  yearRange: YearRange;
  movies: Movie[];
  currentPage: number;
};

export type LOADED_GENRES_ACTION = {
  type: 'loaded_genres';
  genres: Genre[];
};

export type TOGGLED_GENRE_ACTION = {
  type: 'toggled_genre';
  selectedGenres: string[];
};

export type CHANGED_SORT_ACTION = {
  type: 'changed_sort';
  sort: string;
};

export type CHANGED_YEAR_RANGE_ACTION = {
  type: 'changed_year_range';
  range: number[];
};

export type LOADED_MOVIES_ACTION = {
  type: 'loaded_movies';
  movies: Movie[];
  currentPage: number;
};

export type PAGE_SELECTED_ACTION = {
  type: 'page_selected';
  currentPage: number;
};

export type RESET_FILTERS_ACTION = {
  type: 'reset_filters';
};

export type Action =
  | LOADED_GENRES_ACTION
  | TOGGLED_GENRE_ACTION
  | CHANGED_SORT_ACTION
  | CHANGED_YEAR_RANGE_ACTION
  | LOADED_MOVIES_ACTION
  | PAGE_SELECTED_ACTION
  | RESET_FILTERS_ACTION;
