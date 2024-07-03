import { ContextError } from '@/errors/contextError';
import { createContext, useContext } from 'react';

type UserContextType = {
  token: string | null;
};

export const UserContext = createContext<UserContextType>({ token: null });

export const useUserContext = () => {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new ContextError('useUserContext error');
  }
  return userContext;
};
