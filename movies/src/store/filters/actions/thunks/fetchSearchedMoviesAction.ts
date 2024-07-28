import { MoviesResponse } from '@/components/movieList/types/movies.types';
import { thunkErrors } from '@/helpers/constants';
import { createAppAsyncThunk } from '@/store/redux';

interface FetchSearchedMoviesPayload {
  movies: MoviesResponse;
}

interface FetchSearchedMoviesError {
  message: string;
}

export const fetchSearchedMoviesAction = createAppAsyncThunk<
  FetchSearchedMoviesPayload,
  { searchQuery: string; currentPage: number },
  { rejectValue: FetchSearchedMoviesError }
>('filters/fetchSearchedMovies', async ({ searchQuery, currentPage }, thunkAPI) => {
  const response = await thunkAPI.extra.api.filters.getSearchedMovies(searchQuery, currentPage);
  if (response) {
    return { movies: response };
  } else {
    return thunkAPI.rejectWithValue({
      message: thunkErrors.filters.search,
    });
  }
});
