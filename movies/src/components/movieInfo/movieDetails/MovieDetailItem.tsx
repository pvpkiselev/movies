import { Stack, Typography } from '@mui/material';

interface MovieDetailItemProps {
  label: string;
  value: string;
}

function MovieDetailItem({ label, value }: MovieDetailItemProps) {
  return (
    <Stack direction="row" alignItems="flex-start" gap={4} paddingBottom={2}>
      <Typography variant="body1" color="text.secondary" sx={{ minWidth: 120 }}>
        {label}
      </Typography>
      <Typography variant="body1">{value}</Typography>
    </Stack>
  );
}

export default MovieDetailItem;
