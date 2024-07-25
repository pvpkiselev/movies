import getTokenVerification from './auth/getTokenVerification';
import getUserId from './auth/getUserId';
import fetchFavoriteMovie from './filters/fetchFavoriteMovie';
import getFavoriteMoviesList from './filters/getFavoriteMoviesList';
import getGenresData from './filters/getGenresData';
import getMovieCredits from './filters/getMovieCredits';
import getMovieDetails from './filters/getMovieDetails';
import getSearchedMovies from './filters/getSearchedMovies';
import getSortedMovies from './filters/getSortedMovies';

const api = {
  auth: {
    getTokenVerification,
    getUserId,
  },
  filters: {
    fetchFavoriteMovie,
    getFavoriteMoviesList,
    getGenresData,
    getMovieCredits,
    getMovieDetails,
    getSearchedMovies,
    getSortedMovies,
  },
};

export default api;
