import { GetSortedMovies } from '@/api/filters/getSortedMovies';
import { MoviesResponse } from '@/components/movieList/types/movies.types';
import { thunkErrors } from '@/helpers/constants';
import { createAppAsyncThunk } from '@/store/redux';

interface FetchSortedMoviesPayload {
  movies: MoviesResponse;
}

interface FetchSortedMoviesError {
  message: string;
}

export const fetchSortedMoviesAction = createAppAsyncThunk<
  FetchSortedMoviesPayload,
  GetSortedMovies,
  { rejectValue: FetchSortedMoviesError }
>(
  'filters/fetchSortedMovies',
  async ({ currentPage, minYear, maxYear, sortType, genreIdsString }, thunkAPI) => {
    const response = await thunkAPI.extra.api.filters.getSortedMovies({
      currentPage,
      minYear,
      maxYear,
      sortType,
      genreIdsString,
    });
    if (response) {
      return { movies: response };
    } else {
      return thunkAPI.rejectWithValue({
        message: thunkErrors.filters.sorted_movies,
      });
    }
  }
);
