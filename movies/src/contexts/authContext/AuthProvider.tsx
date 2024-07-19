import { createContext, Dispatch, ReactNode, useEffect, useReducer } from 'react';
import { AuthAction, AuthState } from '@/types/auth/authContext.types';
import Cookies from 'js-cookie';
import { setAxiosAuthToken } from '@/api/axiosConfig';

interface AuthProviderProps {
  children: ReactNode;
}

type AuthContextType = AuthState | null;
type AuthDispatchContextType = Dispatch<AuthAction> | null;

const authInitialState: AuthState = {
  isAuth: false,
  token: null,
  userId: null,
};

function authReducer(authState: AuthState, action: AuthAction) {
  switch (action.type) {
    case 'login_success': {
      return {
        ...authState,
        isAuth: true,
        token: action.token,
        userId: action.userId,
      };
    }
    case 'logout': {
      return {
        ...authState,
        isAuth: false,
        token: null,
        userId: null,
      };
    }
    default:
      return authState;
  }
}

const AuthContext = createContext<AuthContextType>(null);
const AuthDispatchContext = createContext<AuthDispatchContextType>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, dispatch] = useReducer(authReducer, authInitialState);

  useEffect(() => {
    try {
      const token = Cookies.get('token');
      const userId = Cookies.get('userId');
      if (token && userId) {
        dispatch({ type: 'login_success', token, userId });
        setAxiosAuthToken(token);
      }
    } catch (error) {
      console.error(`Storage get token error, ${error}`);
    }
  }, []);

  return (
    <AuthContext.Provider value={authState}>
      <AuthDispatchContext.Provider value={dispatch}>{children}</AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthDispatchContext };
