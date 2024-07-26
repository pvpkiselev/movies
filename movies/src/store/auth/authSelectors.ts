import { AppState } from '../redux';

const selectUserId = (state: AppState) => state.auth.userId;
const selectIsAuth = (state: AppState) => state.auth.isAuth;

export { selectUserId, selectIsAuth };
