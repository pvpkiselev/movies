import getSortedMovies from '@/api/filters/getSortedMovies';
import { createAppAsyncThunk } from '@/store/redux';

export const fetchSortedMoviesAction = createAppAsyncThunk(
  'filters/fetchSortedMovies',
  async ({
    currentPage,
    minYear,
    maxYear,
    sortType,
    genreIdsString,
  }: {
    currentPage: number;
    minYear: number;
    maxYear: number;
    sortType: string;
    genreIdsString: string;
  }) => {
    const response = await getSortedMovies({
      currentPage,
      minYear,
      maxYear,
      sortType,
      genreIdsString,
    });

    return { movies: response };
  }
);
