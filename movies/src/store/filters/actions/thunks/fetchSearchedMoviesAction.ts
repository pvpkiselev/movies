import getSearchedMovies from '@/api/filters/getSearchedMovies';
import { createAppAsyncThunk } from '@/store/redux';

export const fetchSearchedMoviesAction = createAppAsyncThunk(
  'filters/fetchSearchedMovies',
  async ({ searchQuery, currentPage }: { searchQuery: string; currentPage: number }) => {
    const response = await getSearchedMovies(searchQuery, currentPage);
    return { movies: response };
  }
);
