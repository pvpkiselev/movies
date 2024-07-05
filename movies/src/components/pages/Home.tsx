import { FilterProvider } from '@/contexts/filterContext/filterProvider';
import Header from '../header/Header';
import { Box, Stack, useMediaQuery } from '@mui/material';
import Filters from '../filters/Filters';
import MovieList from '../movieList/MovieList';
import { theme } from '@/theme/theme';

export default function Home() {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <FilterProvider>
      <Box sx={{ width: '100%', height: '100%' }}>
        <Header />
        <Box sx={{ width: '100%', height: '100%', paddingInline: 4, paddingBlock: 6 }}>
          <Stack direction={isMobile ? 'column' : 'row'} spacing={6} sx={{ width: '100%' }}>
            <Filters />
            <MovieList />
          </Stack>
        </Box>
      </Box>
    </FilterProvider>
  );
}
