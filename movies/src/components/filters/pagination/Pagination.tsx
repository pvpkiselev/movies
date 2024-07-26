import { useMemo } from 'react';
import { selectPaginationValues } from '@/store/filters/filtersSelectors';
import { Pagination } from '@mui/material';
import { pageSelected } from '@/store/filters/filtersSlice';
import { useAppDispatch, useAppSelector } from '@/store/redux';
import { FAVORITES_OPTION } from '../sortSelect/constants';

function PaginationFilter() {
  const dispatch = useAppDispatch();
  const { currentPage, sortType, maxPages, favMaxPages } = useAppSelector(selectPaginationValues);

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
