import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { POPULAR_OPTION } from '@/components/filters/sortSelect/constants';
import { resetFiltersAction } from '../actions/resetFiltersAction';

type SortState = {
  sortType: string;
};

const initialState: SortState = {
  sortType: POPULAR_OPTION,
};

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    changedSortType(state, action: PayloadAction<string>) {
      if (state.sortType !== action.payload) {
        state.sortType = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetFiltersAction, () => initialState);
  },
});

export const { changedSortType } = sortSlice.actions;
const sortReducer = sortSlice.reducer;
export default sortReducer;
