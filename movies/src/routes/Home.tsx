import { Box, Stack } from '@mui/material';
import Filters from '../components/filters/Filters';
import MovieList from '../components/movieList/MovieList';

export default function Home() {
  return (
    <Box sx={{ width: '100%', height: '100%', paddingInline: 4, paddingBlock: 6 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={6} sx={{ width: '100%' }}>
        <Filters />
        <MovieList />
      </Stack>
    </Box>
  );
}
