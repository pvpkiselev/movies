import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { resetFiltersAction } from '../actions/resetFiltersAction';

type YearRangeState = {
  yearRange: number[];
};

const initialState: YearRangeState = {
  yearRange: [1970, 2024],
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
