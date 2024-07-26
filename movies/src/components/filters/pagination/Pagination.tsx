import { useMemo } from 'react';
import { Pagination } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/store/redux';
import { FAVORITES_OPTION } from '../sortSelect/constants';
import { pageSelected } from '@/store/filters/slices/moviesSlice';
import {
  selectCurrentFavMaxPages,
  selectCurrentMaxPages,
  selectCurrentPage,
  selectSortType,
} from '@/store/filters/selectors/filtersSelectors';

function PaginationFilter() {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(selectCurrentPage);
  const sortType = useAppSelector(selectSortType);
  const maxPages = useAppSelector(selectCurrentMaxPages);
  const favMaxPages = useAppSelector(selectCurrentFavMaxPages);

  const isFavorites = useMemo(() => sortType === FAVORITES_OPTION, [sortType]);
  const isDisabled = useMemo(() => maxPages < 2, [maxPages]);

  const pages = isFavorites ? favMaxPages : maxPages;

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    dispatch(pageSelected(page));
  };

  return (
    !isDisabled && (
      <Pagination
        page={currentPage}
        size="medium"
        siblingCount={1}
        count={pages}
        onChange={handlePageChange}
        color="primary"
      />
    )
  );
}

export default PaginationFilter;
