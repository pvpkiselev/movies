import { Genre } from '@/components/filters/genres/types/genres.types';
import { thunkErrors } from '@/helpers/constants';
import { createAppAsyncThunk } from '@/store/redux';

interface FetchGenresDataPayload {
  genres: Genre[];
}

interface FetchGenresDataError {
  message: string;
}

export const fetchGenresDataAction = createAppAsyncThunk<
  FetchGenresDataPayload,
  void,
  { rejectValue: FetchGenresDataError }
>('filters/fetchGenresData', async (_, thunkAPI) => {
  const response = await thunkAPI.extra.api.filters.getGenresData();
  if (response) {
    return response;
  } else {
    return thunkAPI.rejectWithValue({
      message: thunkErrors.filters.genres,
    });
  }
});
