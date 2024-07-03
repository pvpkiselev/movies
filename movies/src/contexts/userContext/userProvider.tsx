import { ReactNode } from 'react';
import { UserContext } from './userContext';
import { TOKEN } from '@/api/constants';

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  return <UserContext.Provider value={{ token: TOKEN }}>{children}</UserContext.Provider>;
};
