import { AppState } from '../store';

const selectUserId = (state: AppState) => state.auth.userId;
const selectIsAuth = (state: AppState) => state.auth.isAuth;

export { selectUserId, selectIsAuth };
