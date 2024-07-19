import { AuthDispatchContext } from '@/contexts/authContext/AuthProvider';
import { ContextError } from '@/errors/contextError';
import { useContext } from 'react';

export const useAuthDispatch = () => {
  const authDispatchContext = useContext(AuthDispatchContext);
  if (!authDispatchContext) {
    throw new ContextError('authDispatchContext error');
  }
  return authDispatchContext;
};
