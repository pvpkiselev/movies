import { Genre } from '@/types/filters/genres.types';
import { YearRange } from '@/types/filters/yearRange.types';
import { Movie } from '../movies/movies.types';

export type FiltersState = {
  genres: Genre[];
  sort: string;
  yearRange: YearRange;
  movies: Movie[];
  currentPage: number;
  favoriteMovies: Movie[];
  searchQuery: string;
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

export type LOADED_FAVORITE_MOVIES = {
  type: 'loaded_favorite_movies';
  favoriteMovies: Movie[];
  currentPage: number;
};

export type CHANGED_SEARCH_QUERY = {
  type: 'changed_search_query';
  searchQuery: string;
};

export type TOGGLED_FAVORITE_MOVIE = {
  type: 'toggle_favorite_movie';
  movie: Movie;
};

export type RESET_FILTERS_ACTION = {
  type: 'reset_filters';
};

export type FiltersAction =
  | LOADED_GENRES_ACTION
  | TOGGLED_GENRE_ACTION
  | CHANGED_SORT_ACTION
  | CHANGED_YEAR_RANGE_ACTION
  | LOADED_MOVIES_ACTION
  | PAGE_SELECTED_ACTION
  | RESET_FILTERS_ACTION
  | LOADED_FAVORITE_MOVIES
  | TOGGLED_FAVORITE_MOVIE
  | CHANGED_SEARCH_QUERY;
// | LOADED_SEARCHED_MOVIES;
