import { CardMedia } from '@mui/material';
import { imageUrlFullSize } from '@/components/movieList/constants';
import { useMediaQuery } from '@mui/material';
import { theme } from '@/theme/theme';

interface MoviePosterProps {
  posterPath: string | null;
  title: string;
}

function MoviePoster({ posterPath, title }: MoviePosterProps) {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <CardMedia
      component="img"
      image={`${imageUrlFullSize}${posterPath}`}
      title={title}
      sx={{
        aspectRatio: isMobile ? '16/9' : '3/4',
        width: '100%',
      }}
    />
  );
}

export default MoviePoster;
