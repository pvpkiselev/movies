import { ResponseError } from '@/errors/responseError';
import { axiosGetInstance } from '../axiosConfig';
import { MoviesResponse } from '@/types/movies/movies.types';
import { HttpStatusCode } from 'axios';
import { POPULAR_OPTION } from '@/components/filters/sortSelect/constants';
import { POPULAR_PATH, TOP_RATED_PATH } from '../constants';
import { resources } from '../resources';

interface GetSortedMovies {
  currentPage: number;
  minYear: number;
  maxYear: number;
  sort: string;
  genresIds: string;
}

interface MovieParams {
  include_adult: boolean;
  include_video: boolean;
  language: string;
  page: number;
  'release_date.gte': string;
  'release_date.lte': string;
  sort_by: string;
  with_genres?: string;
}

const getSortedMovies = async (props: GetSortedMovies): Promise<MoviesResponse> => {
  try {
    const { currentPage, minYear, maxYear, sort, genresIds } = props;

    const startDate = `${minYear}-01-01`;
    const endDate = `${maxYear}-12-31`;

    const sortType = sort === POPULAR_OPTION ? POPULAR_PATH : TOP_RATED_PATH;
    if (genresIds) {
      const encodedGenres = encodeURIComponent(genresIds);
      encodedGenres;
    }

    const { discover, movie } = resources;
    const resource = `${discover}/${movie}`;

    const params: MovieParams = {
      include_adult: false,
      include_video: false,
      language: 'en',
      page: currentPage,
      'release_date.gte': startDate,
      'release_date.lte': endDate,
      sort_by: sortType,
    };

    params.with_genres = encodeURIComponent(genresIds);

    const config = {
      url: resource,
      params: params,
    };

    const response = await axiosGetInstance(config);

    if (response.status === HttpStatusCode.Ok) {
      return response.data;
    } else {
      throw new ResponseError('Error fetching top rated movies data');
    }
  } catch (error) {
    console.error(`Failed to fetch top rated movies:`, error);
    throw error;
  }
};

export default getSortedMovies;
