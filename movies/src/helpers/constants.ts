export const toastMessages = {
  favorites: {
    success_add: 'Successfully added card',
    success_delete: 'Successfully removed card',
    failed: 'Failed to toggle favorite',
  },
  auth: {
    login_failed: 'Login failed: Incorrect token',
    storage_failed: 'Storage get token error',
  },
};

export const loaderErrors = {
  info_loader: 'Movie details or credits not found',
};

export const thunkErrors = {
  filters: {
    favorite_movie: 'Failed to fetch favorite movie status',
    favorite_list: 'Error getting Favorite Movie List',
    genres: 'Error getting Genres Data',
    search: 'Error getting Search Results',
    sorted_movies: 'Error getting Sorted Movies',
  },
};

export const movieListErrors = {
  fetch_failed: 'Failed to fetch movies. Please try again later.',
};

export const DEFAULT_ERROR_MESSAGE = 'Unknown error occurred';
export const FETCH_DATA_ERROR = 'Fetch data error:';
