import { redirect, LoaderFunctionArgs } from 'react-router-dom';
import getMovieDetails from '@/api/moviePage/getMovieDetails';
import getMovieCredits from '@/api/moviePage/getMovieCredits';
import { MovieInfoLoaderData } from './types/movieInfoLoader.types';

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
      throw new Error('Movie details or credits not found');
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
