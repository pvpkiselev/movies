import { LOGIN, LOGOUT } from '@/store/actions/authorization/authActions';

type AuthState = {
  isAuth: boolean;
  email: string | null;
  token: string | null;
  userId: string | null;
};

type REDUCER_LOGIN_TYPE = {
  type: typeof LOGIN;
  token: string;
  userId: string;
};

type REDUCER_LOGOUT_TYPE = {
  type: typeof LOGOUT;
};

export type AUTH_ACTION = REDUCER_LOGIN_TYPE | REDUCER_LOGOUT_TYPE;

const authInitialState: AuthState = {
  isAuth: false,
  email: null,
  token: null,
  userId: null,
};

export function authReducer(authState: AuthState = authInitialState, action: AUTH_ACTION) {
  switch (action.type) {
    case LOGIN: {
      return {
        ...authState,
        token: action.token,
        userId: action.userId,
        isAuth: true,
      };
    }
    case LOGOUT: {
      return {
        ...authState,
        email: null,
        token: null,
        userId: null,
        isAuth: false,
      };
    }
    default: {
      return authState;
    }
  }
}
