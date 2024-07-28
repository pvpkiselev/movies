import { thunkErrors } from '@/helpers/constants';
import { createAppAsyncThunk } from '@/store/redux';

interface FetchFavoriteMoviePayload {
  movieId: number;
  success: boolean;
}

interface FetchFavoriteMovieError {
  message: string;
}

export const fetchFavoriteMovieAction = createAppAsyncThunk<
  FetchFavoriteMoviePayload,
  { userId: string; movieId: number; isFavorite: boolean },
  { rejectValue: FetchFavoriteMovieError }
>('filters/fetchFavoriteMovie', async ({ userId, movieId, isFavorite }, thunkAPI) => {
  const response = await thunkAPI.extra.api.filters.fetchFavoriteMovie(userId, movieId, isFavorite);
  if (response) {
    return { movieId, success: response.success };
  } else {
    return thunkAPI.rejectWithValue({
      message: thunkErrors.filters.favorite_movie,
    });
  }
});
