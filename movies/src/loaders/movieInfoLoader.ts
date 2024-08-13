import { redirect, LoaderFunctionArgs } from 'react-router-dom';

import getMovieDetails from '@/api/filters/getMovieDetails';
import getMovieCredits from '@/api/filters/getMovieCredits';
import { MovieInfoLoaderData } from './types/movieInfoLoader.types';
import { loaderErrors } from '@/helpers/constants';

export async function movieInfoLoader({
  params,
}: LoaderFunctionArgs): Promise<MovieInfoLoaderData | Response> {
  const { movieId } = params;

  if (!movieId) {
    return redirect('/error');
  }

  try {
    const [movieDetails, movieCredits] = await Promise.all([
      getMovieDetails(movieId),
      getMovieCredits(movieId),
    ]);

    if (!movieDetails || !movieCredits) {
      throw new Error(loaderErrors.info_loader);
    }

    return {
      details: movieDetails,
      credits: movieCredits,
    };
  } catch (error) {
    console.error(error);
    return redirect('/error');
  }
}
