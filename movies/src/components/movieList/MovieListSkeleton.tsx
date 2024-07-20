import { Grid, Skeleton } from '@mui/material';

function MovieListSkeleton() {
  return (
    <Grid container spacing={3} wrap="wrap">
      {Array.from(new Array(12)).map((_, index) => (
        <Grid item xs={12} md={6} lg={3} key={index} display="flex" flexDirection="column">
          <Skeleton variant="rectangular" width="100%" height={300} />
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="60%" />
        </Grid>
      ))}
    </Grid>
  );
}

export default MovieListSkeleton;
