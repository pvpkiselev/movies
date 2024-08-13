import getGenresData from '@/api/filters/getGenresData';
import { createAppAsyncThunk } from '@/store/redux';

export const fetchGenresDataAction = createAppAsyncThunk('filters/fetchGenresData', async () => {
  return await getGenresData();
});
