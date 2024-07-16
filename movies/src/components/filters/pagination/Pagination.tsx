import { useFilters } from '@/hooks/useFilters';
import { useFiltersDispatch } from '@/hooks/useFiltersDispatch';
import { Pagination } from '@mui/material';

function PaginationFilter() {
  const filtersState = useFilters();
  const dispatch = useFiltersDispatch();

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    dispatch({
      type: 'page_selected',
      currentPage: page,
    });
  };

  const currentPage = filtersState.currentPage;
  const totalPages = 500;

  return (
    <Pagination
      page={currentPage}
      size="medium"
      siblingCount={1}
      count={totalPages}
      onChange={handlePageChange}
      color="primary"
    />
  );
}

export default PaginationFilter;
