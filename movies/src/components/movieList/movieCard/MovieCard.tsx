import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { theme } from '@/theme/theme';

interface MovieCardProps {
  title: string;
  imageSrc: string;
  rating: string;
}

function MovieCard(props: MovieCardProps) {
  const { title, imageSrc, rating } = props;

  return (
    <Card
      elevation={0}
      sx={{
        backgroundColor: theme.palette.grey[50],
        maxWidth: '100%',
        minWidth: '240px',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardMedia sx={{ height: 200 }} image={imageSrc} title={title} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rating {rating}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default MovieCard;
