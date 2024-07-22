import { useFilters } from '@/hooks/useFilters';
import { useFiltersDispatch } from '@/hooks/useFiltersDispatch';
import { Pagination } from '@mui/material';

function PaginationFilter() {
  const filtersState = useFilters();
  const dispatch = useFiltersDispatch();

  const { currentPage, maxPages } = filtersState;

  const POSSIBLE_PAGES = 500;

  const totalPages = Math.min(maxPages, POSSIBLE_PAGES);

  const isDisabled = totalPages < 2;

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    dispatch({
      type: 'page_selected',
      currentPage: page,
    });
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
