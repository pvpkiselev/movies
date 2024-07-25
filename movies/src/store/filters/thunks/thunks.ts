import { DEFAULT_ERROR_MESSAGE } from '@/api/constants';
import { createAppAsyncThunk } from '@/store/redux';

interface FetchFavoriteMoviePayload {
  movieId: number;
  isFavorite: boolean;
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
  try {
    const response = await thunkAPI.extra.api.filters.fetchFavoriteMovie(
      userId,
      movieId,
      isFavorite
    );
    return { movieId, isFavorite, success: response.success };
  } catch (error) {
    return thunkAPI.rejectWithValue({
      message: error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE,
    });
  }
});
