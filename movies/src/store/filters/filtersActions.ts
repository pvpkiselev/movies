/* eslint-disable max-lines */
const TOGGLED_GENRES = 'TOGGLED_GENRES';
const CHANGED_SORT_TYPE = 'CHANGED_SORT_TYPE';
const CHANGED_YEAR_RANGE = 'CHANGED_YEAR_RANGE';
const CHANGED_MAX_PAGES = 'CHANGED_MAX_PAGES';
const PAGE_SELECTED = 'PAGE_SELECTED';
const LOADED_FAVORITE_MOVIES_IDS = 'LOADED_FAVORITE_MOVIES_IDS';
const TOGGLED_FAVORITE = 'TOGGLED_FAVORITE';
const CHANGED_SEARCH_QUERY = 'CHANGED_SEARCH_QUERY';
const RESET_FILTERS = 'RESET_FILTERS';

type TOGGLED_GENRES_ACTION = {
  type: typeof TOGGLED_GENRES;
  genreIds: number[];
};

type CHANGED_SORT_TYPE_ACTION = {
  type: typeof CHANGED_SORT_TYPE;
  sortType: string;
};

type CHANGED_YEAR_RANGE_ACTION = {
  type: typeof CHANGED_YEAR_RANGE;
  range: number[];
};

type CHANGED_MAX_PAGES_ACTION = {
  type: typeof CHANGED_MAX_PAGES;
  maxPages: number;
};

type PAGE_SELECTED_ACTION = {
  type: typeof PAGE_SELECTED;
  currentPage: number;
};

type LOADED_FAVORITE_MOVIES_IDS_ACTION = {
  type: typeof LOADED_FAVORITE_MOVIES_IDS;
  favMoviesIds: number[];
};

type TOGGLED_FAVORITE_ACTION = {
  type: typeof TOGGLED_FAVORITE;
  favId: number;
};

type CHANGED_SEARCH_QUERY_ACTION = {
  type: typeof CHANGED_SEARCH_QUERY;
  searchQuery: string;
};

type RESET_FILTERS_ACTION = {
  type: typeof RESET_FILTERS;
};

export type FILTERS_ACTION =
  | TOGGLED_GENRES_ACTION
  | CHANGED_SORT_TYPE_ACTION
  | CHANGED_YEAR_RANGE_ACTION
  | CHANGED_MAX_PAGES_ACTION
  | PAGE_SELECTED_ACTION
  | LOADED_FAVORITE_MOVIES_IDS_ACTION
  | TOGGLED_FAVORITE_ACTION
  | CHANGED_SEARCH_QUERY_ACTION
  | RESET_FILTERS_ACTION;

function toggleGenres(genreIds: number[]): TOGGLED_GENRES_ACTION {
  return {
    type: TOGGLED_GENRES,
    genreIds,
  };
}

function changeSortType(sortType: string): CHANGED_SORT_TYPE_ACTION {
  return {
    type: CHANGED_SORT_TYPE,
    sortType,
  };
}

function changeYearRange(range: number[]): CHANGED_YEAR_RANGE_ACTION {
  return {
    type: CHANGED_YEAR_RANGE,
    range,
  };
}

function changeMaxPages(maxPages: number): CHANGED_MAX_PAGES_ACTION {
  return {
    type: CHANGED_MAX_PAGES,
    maxPages,
  };
}

function changeSelectedPage(currentPage: number): PAGE_SELECTED_ACTION {
  return {
    type: PAGE_SELECTED,
    currentPage,
  };
}

function loadFavoriteMoviesIds(favMoviesIds: number[]): LOADED_FAVORITE_MOVIES_IDS_ACTION {
  return {
    type: LOADED_FAVORITE_MOVIES_IDS,
    favMoviesIds,
  };
}

function toggleFavorite(favId: number): TOGGLED_FAVORITE_ACTION {
  return {
    type: TOGGLED_FAVORITE,
    favId,
  };
}

function changeSearchQuery(searchQuery: string): CHANGED_SEARCH_QUERY_ACTION {
  return {
    type: CHANGED_SEARCH_QUERY,
    searchQuery,
  };
}

function resetFilters(): RESET_FILTERS_ACTION {
  return {
    type: RESET_FILTERS,
  };
}

export {
  TOGGLED_GENRES,
  CHANGED_SORT_TYPE,
  CHANGED_YEAR_RANGE,
  CHANGED_MAX_PAGES,
  PAGE_SELECTED,
  LOADED_FAVORITE_MOVIES_IDS,
  TOGGLED_FAVORITE,
  CHANGED_SEARCH_QUERY,
  RESET_FILTERS,
  toggleGenres,
  changeSortType,
  changeYearRange,
  changeMaxPages,
  changeSelectedPage,
  loadFavoriteMoviesIds,
  toggleFavorite,
  changeSearchQuery,
  resetFilters,
};
