import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Genre } from '@/components/filters/genres/types/genres.types';
import { fetchGenresDataAction } from '../actions/thunks/fetchGenresDataAction';
import { DEFAULT_ERROR_MESSAGE } from '@/api/constants';
import { resetFiltersAction } from '../actions/resetFiltersAction';

type GenresState = {
  genres: Genre[];
  status: 'pending' | 'fulfilled' | 'rejected';
  error: string | null;
};

const initialState: GenresState = {
  genres: [],
  status: 'fulfilled',
  error: null,
};

const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {
    toggledGenres(state, action: PayloadAction<number[]>) {
      const selectedGenresSet = new Set(action.payload);
      const updatedGenres = state.genres.map((genre) => ({
        ...genre,
        checked: selectedGenresSet.has(genre.id),
      }));
      return {
        ...state,
        genres: updatedGenres,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenresDataAction.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(fetchGenresDataAction.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        const genres = action.payload.genres.map((genre) => ({ ...genre, checked: false }));
        state.genres = genres;
      })
      .addCase(fetchGenresDataAction.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload?.message ?? DEFAULT_ERROR_MESSAGE;
      })
      .addCase(resetFiltersAction, (state) => {
        const areAllGenresUnchecked = state.genres.every((genre) => !genre.checked);
        if (areAllGenresUnchecked) {
          return state;
        }
        return {
          ...initialState,
          genres: state.genres.map((genre) => ({
            ...genre,
            checked: false,
          })),
        };
      });
  },
});

export const { toggledGenres } = genresSlice.actions;
const genresReducer = genresSlice.reducer;
export default genresReducer;
