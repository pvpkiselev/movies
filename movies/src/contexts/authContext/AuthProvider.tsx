import Cookies from 'js-cookie';
import { createContext, ReactNode, useEffect, useState } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

type AuthContextType = {
  authToken: string | null;
  setAuthToken: (token: string | null) => void;
};

const AuthContext = createContext<AuthContextType>({
  authToken: null,
  setAuthToken: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    try {
      const authToken = Cookies.get('token');
      if (authToken) {
        setAuthToken(authToken);
      }
    } catch (error) {
      console.error(`Storage get token error, ${error}`);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
