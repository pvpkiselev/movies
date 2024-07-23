import { useDispatch, useSelector } from 'react-redux';
import { MoviesAppDispatch, MoviesAppState } from '@/store/store';

export const useAuthSelector = <TSelected>(selector: (state: MoviesAppState) => TSelected) =>
  useSelector(selector);

export const useAuthDispatch = useDispatch.withTypes<MoviesAppDispatch>();
