import { MovieCreditsType } from './movieCredits.types';
import { MovieDetailsType } from './movieDetails.types';

export interface MovieInfoLoaderData {
  details: MovieDetailsType;
  credits: MovieCreditsType;
}
