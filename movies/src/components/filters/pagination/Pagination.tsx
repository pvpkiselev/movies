import { useMemo } from 'react';
import { selectPaginationValues } from '@/store/filters/filtersSelectors';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { Pagination } from '@mui/material';
import { pageSelected } from '@/store/filtersSlice';

function PaginationFilter() {
  const dispatch = useAppDispatch();
  const { currentPage, totalPages } = useAppSelector(selectPaginationValues);

  const isDisabled = useMemo(() => totalPages < 2, [totalPages]);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    dispatch(pageSelected(page));
  };

  return (
    !isDisabled && (
      <Pagination
        page={currentPage}
        size="medium"
        siblingCount={1}
        count={totalPages}
        onChange={handlePageChange}
        color="primary"
      />
    )
  );
}

export default PaginationFilter;
