import { Box, Typography } from '@mui/material';
import MovieDetailItem from './MovieDetailItem';
import { MovieDetailsType } from '@/types/movies/movieDetails.types';
import { CrewMember } from '@/types/movies/movieCredits.types';

interface MovieDetailsProps {
  details: MovieDetailsType;
  crew: CrewMember[];
}

function MovieDetails({ details, crew }: MovieDetailsProps) {
  const productionCountries = details.production_countries
    .map((country) => country.name)
    .join(', ');

  const releaseDate = new Date(details.release_date).getFullYear().toString();

  const runtime = `${details.runtime} min`;

  const genres = details.genres.map((genre) => genre.name).join(', ');

  const directors = crew.filter((employee) => employee.job === 'Director');
  const directorsNames = directors.map((director) => director.name).join(', ');

  return (
    <Box>
      <Typography variant="h4" component="h2" paddingBottom={4}>
        Details
      </Typography>
      <MovieDetailItem label="Countries" value={productionCountries} />
      <MovieDetailItem label="Year" value={releaseDate} />
      <MovieDetailItem label="Runtime" value={runtime} />
      <MovieDetailItem label="Genre" value={genres} />
      <MovieDetailItem label="Director" value={directorsNames} />
    </Box>
  );
}

export default MovieDetails;
