import { useFilters } from '@/hooks/useFilters';
import { useFiltersDispatch } from '@/hooks/useFiltersDispatch';
import { Pagination } from '@mui/material';

function PaginationFilter() {
  const filtersState = useFilters();
  const dispatch = useFiltersDispatch();

  const { currentPage, currentFavPage, maxPages, maxFavPages, showFavorites } = filtersState;

  const currentPageNumber = showFavorites ? currentFavPage : currentPage;

  const POSSIBLE_PAGES = 500;

  const totalPages = Math.min(showFavorites ? maxFavPages : maxPages, POSSIBLE_PAGES);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    dispatch({
      type: 'page_selected',
      currentPage: page,
    });
  };

  return (
    <Pagination
      page={currentPageNumber}
      size="medium"
      siblingCount={1}
      count={totalPages}
      onChange={handlePageChange}
      color="primary"
    />
  );
}

export default PaginationFilter;
