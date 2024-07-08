import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { theme } from '@/theme/theme';
import { Link } from 'react-router-dom';

interface MovieCardProps {
  linkId: number;
  title: string;
  imageSrc: string;
  rating: string;
}

function MovieCard(props: MovieCardProps) {
  const { linkId, title, imageSrc, rating } = props;

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
      <Link to={`movies/${linkId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <CardMedia sx={{ height: 200 }} image={imageSrc} title={title} />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Rating {rating}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
}

export default MovieCard;
