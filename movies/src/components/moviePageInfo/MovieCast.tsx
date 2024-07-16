import { Actor } from '@/types/movies/movieCredits.types';
import { Typography, List } from '@mui/material';

interface MovieCastProps {
  cast: Actor[];
}

function MovieCast({ cast }: MovieCastProps) {
  return (
    <List sx={{ fontSize: 18, fontWeight: 500, padding: 0 }}>
      {cast.slice(0, 5).map((actor) => (
        <Typography key={actor.cast_id} sx={{ fontSize: 18, fontWeight: 500 }}>
          {actor.name}
        </Typography>
      ))}
    </List>
  );
}

export default MovieCast;
