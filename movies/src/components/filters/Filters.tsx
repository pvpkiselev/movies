import { useState } from 'react';
import { theme } from '@/theme/theme';
import { Box, Button, IconButton, Paper, Stack, Typography, useMediaQuery } from '@mui/material';
import SortSelect from './sortSelect/SortSelect';
import YearRangeSlider from './yearRangeSlider/YearRangeSlider';
import Genres from './genres/Genres';
import ResetButton from './resetButton/ResetButton';
import PaginationFilter from './pagination/Pagination';
import { Close } from '@mui/icons-material';
import Search from './search/Search';

function Filters() {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMobileOpen = () => {
    setMobileOpen(true);
  };

  const handleMobileClose = () => {
    setMobileOpen(false);
  };

  return (
    <Box flexBasis={{ sm: '100%', md: '360px' }} flexGrow={0} flexShrink={0}>
      {isMobile && (
        <Box>
          <Button variant="contained" disableElevation onClick={handleMobileOpen}>
            Filters
          </Button>
        </Box>
      )}
      <Paper
        elevation={0}
        sx={{
          display: { xs: mobileOpen ? 'block' : 'none', sm: 'block' },
          position: { xs: 'fixed', sm: 'relative' },
          ...(isMobile && {
            bottom: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1000,
            paddingInline: 4,
            paddingBlock: 6,
            borderRadius: 0,
          }),
        }}
      >
        <Stack rowGap={8}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Typography variant="h4" component="h3">
              Filters
            </Typography>
            {isMobile && (
              <IconButton aria-label="close" onClick={handleMobileClose}>
                <Close />
              </IconButton>
            )}
          </Stack>
          <Search />
          <SortSelect /> <YearRangeSlider />
          <Genres />
          <PaginationFilter />
          <ResetButton />
        </Stack>
      </Paper>
    </Box>
  );
}

export default Filters;
