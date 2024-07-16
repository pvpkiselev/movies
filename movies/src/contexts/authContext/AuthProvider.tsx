import { createContext, ReactNode, useEffect, useReducer } from 'react';
import { authInitialState, authReducer } from './authReducer';
import { AuthState } from '@/types/auth/authReducer.types';
import Cookies from 'js-cookie';
import { setAxiosAuthToken } from '@/api/axiosConfig';

interface AuthProviderProps {
  children: ReactNode;
}

type AuthContextType = {
  authState: AuthState;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  authState: authInitialState,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, dispatch] = useReducer(authReducer, authInitialState);

  useEffect(() => {
    try {
      const token = Cookies.get('token');
      if (token) {
        dispatch({ type: 'login_success', token });
        setAxiosAuthToken(token);
      }
    } catch (error) {
      console.error(`Storage get token error, ${error}`);
    }
  }, []);

  const login = (token: string) => {
    dispatch({ type: 'login_success', token });
    setAxiosAuthToken(token);
    Cookies.set('token', token);
  };

  const logout = () => {
    dispatch({ type: 'logout' });
    setAxiosAuthToken(null);
    Cookies.remove('token');
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
