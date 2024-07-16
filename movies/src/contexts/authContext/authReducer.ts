import { AuthAction, AuthState } from '@/types/auth/authReducer.types';

export const authInitialState: AuthState = {
  isAuth: false,
  token: null,
};

export function authReducer(authState: AuthState, action: AuthAction) {
  switch (action.type) {
    case 'login_success': {
      return {
        ...authState,
        isAuth: true,
        token: action.token,
      };
    }
    case 'logout': {
      return {
        ...authState,
        isAuth: false,
        token: null,
      };
    }
    default:
      return authState;
  }
}
