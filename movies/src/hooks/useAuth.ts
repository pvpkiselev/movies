import { AuthContext } from '@/contexts/authContext/AuthProvider';
import { ContextError } from '@/errors/contextError';
import { useContext } from 'react';

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new ContextError('authContext error');
  }
  return authContext;
};
