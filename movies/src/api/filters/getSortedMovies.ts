import { axiosInstance, Config } from '../axiosConfig';
import { POPULAR_OPTION } from '@/components/filters/sortSelect/constants';
import { POPULAR_PATH, TOP_RATED_PATH } from '../constants';
import { resources } from '../resources';
import { HttpStatusCode } from 'axios';

export interface GetSortedMovies {
  currentPage: number;
  minYear: number;
  maxYear: number;
  sortType: string;
  genreIdsString: string;
}

const getSortedMovies = async (props: GetSortedMovies) => {
  const { currentPage, minYear, maxYear, sortType, genreIdsString } = props;
  const startDate = `${minYear}-01-01`;
  const endDate = `${maxYear}-12-31`;

  const sortPath = sortType === POPULAR_OPTION ? POPULAR_PATH : TOP_RATED_PATH;

  const { discover, movie } = resources;
  const url = `${discover}/${movie}`;

  const params = {
    include_adult: false,
    include_video: false,
    language: 'en',
    page: currentPage,
    'release_date.gte': startDate,
    'release_date.lte': endDate,
    sort_by: sortPath,
    with_genres: encodeURIComponent(genreIdsString),
  };

  const config: Config = {
    method: 'GET',
    url,
    params,
  };

  try {
    const response = await axiosInstance(config);
    const isSuccess = response.status === HttpStatusCode.Ok;
    if (isSuccess) {
      return response.data;
    }
  } catch (error) {
    console.error('Error getting Sorted Movies:', error);
  }
};

export default getSortedMovies;
