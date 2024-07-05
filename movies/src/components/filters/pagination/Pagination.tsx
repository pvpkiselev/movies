import { useFilterContext, useFilterDispatchContext } from '@/contexts/filterContext/filterContext';
import { Pagination } from '@mui/material';

function PaginationFilter() {
  const filtersState = useFilterContext();
  const dispatch = useFilterDispatchContext();

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
