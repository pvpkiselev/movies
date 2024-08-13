import getFavoriteMoviesList from '@/api/filters/getFavoriteMoviesList';
import { createAppAsyncThunk } from '@/store/redux';

export const fetchFavoriteMoviesListAction = createAppAsyncThunk(
  'filters/fetchFavoriteMoviesList',
  async ({ userId, currentPage }: { userId: string; currentPage?: number }) => {
    return await getFavoriteMoviesList(userId, currentPage);
  }
);
