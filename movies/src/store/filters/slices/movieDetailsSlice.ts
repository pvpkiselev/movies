import { createSlice } from '@reduxjs/toolkit';
import { fetchMovieCreditsAction } from '../actions/thunks/fetchMovieCreditsAction';
import { fetchMovieDetailsAction } from '../actions/thunks/fetchMovieDetailsAction';
import { DEFAULT_ERROR_MESSAGE } from '@/api/constants';
import { resetFiltersAction } from '../actions/resetFiltersAction';

type MovieDetailsState = {
  status: 'pending' | 'fulfilled' | 'rejected';
  error: string | null;
};

const initialState: MovieDetailsState = {
  status: 'fulfilled',
  error: null,
};

const movieDetailsSlice = createSlice({
  name: 'movieDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieCreditsAction.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(fetchMovieCreditsAction.fulfilled, (state) => {
        state.status = 'fulfilled';
      })
      .addCase(fetchMovieCreditsAction.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload?.message ?? DEFAULT_ERROR_MESSAGE;
      })
      .addCase(fetchMovieDetailsAction.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(fetchMovieDetailsAction.fulfilled, (state) => {
        state.status = 'fulfilled';
      })
      .addCase(fetchMovieDetailsAction.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload?.message ?? DEFAULT_ERROR_MESSAGE;
      })
      .addCase(resetFiltersAction, () => initialState);
  },
});

const movieDetailsReducer = movieDetailsSlice.reducer;
export default movieDetailsReducer;
