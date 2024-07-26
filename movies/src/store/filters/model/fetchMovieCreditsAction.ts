import { Actor, CrewMember } from '@/components/moviePageInfo/types/movieCredits.types';
import { createAppAsyncThunk } from '@/store/redux';

interface FetchMovieCreditsPayload {
  id: number;
  cast: Actor[];
  crew: CrewMember[];
}

interface FetchMovieCreditsError {
  message: string;
}

export const fetchMovieCreditsAction = createAppAsyncThunk<
  FetchMovieCreditsPayload,
  { id: string },
  { rejectValue: FetchMovieCreditsError }
>('filters/fetchMovieCredits', async ({ id }, thunkAPI) => {
  const response = await thunkAPI.extra.api.filters.getMovieCredits(id);
  if (response) {
    return response;
  } else {
    return thunkAPI.rejectWithValue({
      message: 'Error getting Movie Credits',
    });
  }
});
