import { MoviesAppState } from '../store';

const selectUserId = (state: MoviesAppState) => state.auth.userId;
const selectIsAuth = (state: MoviesAppState) => state.auth.isAuth;

export { selectUserId, selectIsAuth };
