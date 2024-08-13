import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { resetFiltersAction } from '../actions/resetFiltersAction';
import { yearRangeMax, yearRangeMin } from '@/helpers/constants';

type YearRangeState = {
  yearRange: number[];
};

const initialState: YearRangeState = {
  yearRange: [yearRangeMin, yearRangeMax],
};

const yearRangeSlice = createSlice({
  name: 'yearRange',
  initialState,
  reducers: {
    changedYearRange(state, action: PayloadAction<number[]>) {
      state.yearRange = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetFiltersAction, () => initialState);
  },
});

export const { changedYearRange } = yearRangeSlice.actions;
const yearRangeReducer = yearRangeSlice.reducer;
export default yearRangeReducer;
