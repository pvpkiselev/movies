import { MovieDetailsType } from '@/components/moviePageInfo/types/movieDetails.types';
import { createAppAsyncThunk } from '@/store/redux';

interface FetchMovieDetailsPayload {
  details: MovieDetailsType;
}

interface FetchMovieDetailsError {
  message: string;
}

export const fetchMovieDetailsAction = createAppAsyncThunk<
  FetchMovieDetailsPayload,
  { id: string },
  { rejectValue: FetchMovieDetailsError }
>('filters/fetchMovieDetails', async ({ id }, thunkAPI) => {
  const response = await thunkAPI.extra.api.filters.getMovieDetails(id);
  if (response) {
    return { details: response };
  } else {
    return thunkAPI.rejectWithValue({
      message: 'Error getting Movie Details',
    });
  }
});
