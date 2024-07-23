import { useMemo } from 'react';
import { selectCurrentPage, selectTotalPages } from '@/store/filters/filtersSelectors';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { Pagination } from '@mui/material';
import { changeSelectedPage } from '@/store/filters/filtersActions';

function PaginationFilter() {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(selectCurrentPage);
  const totalPages = useAppSelector(selectTotalPages);

  const isDisabled = useMemo(() => totalPages < 2, [totalPages]);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    dispatch(changeSelectedPage(page));
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
