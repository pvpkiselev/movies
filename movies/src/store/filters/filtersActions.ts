// export const TOGGLED_GENRES = 'TOGGLED_GENRES';
// type TOGGLED_GENRES_ACTION = {
//   type: typeof TOGGLED_GENRES;
//   genreIds: number[];
// };
// export function toggleGenres(genreIds: number[]): TOGGLED_GENRES_ACTION {
//   return {
//     type: TOGGLED_GENRES,
//     genreIds,
//   };
// }

// export const CHANGED_SORT_TYPE = 'CHANGED_SORT_TYPE';
// type CHANGED_SORT_TYPE_ACTION = {
//   type: typeof CHANGED_SORT_TYPE;
//   sortType: string;
// };
// export function changeSortType(sortType: string): CHANGED_SORT_TYPE_ACTION {
//   return {
//     type: CHANGED_SORT_TYPE,
//     sortType,
//   };
// }

// export const CHANGED_YEAR_RANGE = 'CHANGED_YEAR_RANGE';
// type CHANGED_YEAR_RANGE_ACTION = {
//   type: typeof CHANGED_YEAR_RANGE;
//   range: number[];
// };
// export function changeYearRange(range: number[]): CHANGED_YEAR_RANGE_ACTION {
//   return {
//     type: CHANGED_YEAR_RANGE,
//     range,
//   };
// }

// export const CHANGED_MAX_PAGES = 'CHANGED_MAX_PAGES';
// type CHANGED_MAX_PAGES_ACTION = {
//   type: typeof CHANGED_MAX_PAGES;
//   maxPages: number;
// };
// export function changeMaxPages(maxPages: number): CHANGED_MAX_PAGES_ACTION {
//   return {
//     type: CHANGED_MAX_PAGES,
//     maxPages,
//   };
// }

// export const PAGE_SELECTED = 'PAGE_SELECTED';
// type PAGE_SELECTED_ACTION = {
//   type: typeof PAGE_SELECTED;
//   currentPage: number;
// };
// export function changeSelectedPage(currentPage: number): PAGE_SELECTED_ACTION {
//   return {
//     type: PAGE_SELECTED,
//     currentPage,
//   };
// }

// export const LOADED_FAVORITE_MOVIES_IDS = 'LOADED_FAVORITE_MOVIES_IDS';
// type LOADED_FAVORITE_MOVIES_IDS_ACTION = {
//   type: typeof LOADED_FAVORITE_MOVIES_IDS;
//   favMoviesIds: number[];
// };
// export function loadFavoriteMoviesIds(favMoviesIds: number[]): LOADED_FAVORITE_MOVIES_IDS_ACTION {
//   return {
//     type: LOADED_FAVORITE_MOVIES_IDS,
//     favMoviesIds,
//   };
// }

// export const TOGGLED_FAVORITE = 'TOGGLED_FAVORITE';
// type TOGGLED_FAVORITE_ACTION = {
//   type: typeof TOGGLED_FAVORITE;
//   favId: number;
// };
// export function toggleFavorite(favId: number): TOGGLED_FAVORITE_ACTION {
//   return {
//     type: TOGGLED_FAVORITE,
//     favId,
//   };
// }

// export const CHANGED_SEARCH_QUERY = 'CHANGED_SEARCH_QUERY';
// type CHANGED_SEARCH_QUERY_ACTION = {
//   type: typeof CHANGED_SEARCH_QUERY;
//   searchQuery: string;
// };
// export function changeSearchQuery(searchQuery: string): CHANGED_SEARCH_QUERY_ACTION {
//   return {
//     type: CHANGED_SEARCH_QUERY,
//     searchQuery,
//   };
// }

// export const RESET_FILTERS = 'RESET_FILTERS';
// type RESET_FILTERS_ACTION = {
//   type: typeof RESET_FILTERS;
// };
// export function resetFilters(): RESET_FILTERS_ACTION {
//   return {
//     type: RESET_FILTERS,
//   };
// }

// export type FILTERS_ACTION =
//   | TOGGLED_GENRES_ACTION
//   | CHANGED_SORT_TYPE_ACTION
//   | CHANGED_YEAR_RANGE_ACTION
//   | CHANGED_MAX_PAGES_ACTION
//   | PAGE_SELECTED_ACTION
//   | LOADED_FAVORITE_MOVIES_IDS_ACTION
//   | TOGGLED_FAVORITE_ACTION
//   | CHANGED_SEARCH_QUERY_ACTION
//   | RESET_FILTERS_ACTION;
