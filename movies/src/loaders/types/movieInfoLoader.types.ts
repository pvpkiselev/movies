import { MovieCreditsType } from '../../components/moviePageInfo/types/movieCredits.types';
import { MovieDetailsType } from '../../components/moviePageInfo/types/movieDetails.types';

export interface MovieInfoLoaderData {
  details: MovieDetailsType;
  credits: MovieCreditsType;
}
