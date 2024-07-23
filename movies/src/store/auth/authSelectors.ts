import { MoviesAppState } from '../store';

const selectUserId = (state: MoviesAppState) => state.auth.userId;

export { selectUserId };
