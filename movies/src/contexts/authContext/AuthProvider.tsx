import { createContext, ReactNode, useState } from 'react';

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

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
