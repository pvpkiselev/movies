import { MoviesResponse } from '@/components/movieList/types/movies.types';
import { createAppAsyncThunk } from '@/store/redux';

interface FetchFavoriteMoviesListPayload {
  movies: MoviesResponse;
}

interface FetchFavoriteMoviesListError {
  message: string;
}

export const fetchFavoriteMoviesListAction = createAppAsyncThunk<
  FetchFavoriteMoviesListPayload,
  { userId: string; currentPage?: number },
  { rejectValue: FetchFavoriteMoviesListError }
>('filters/fetchFavoriteMoviesList', async ({ userId, currentPage }, thunkAPI) => {
  const response = await thunkAPI.extra.api.filters.getFavoriteMoviesList(userId, currentPage);
  if (response) {
    return { movies: response };
  } else {
    return thunkAPI.rejectWithValue({
      message: 'Error getting Favorite Movie List',
    });
  }
});
