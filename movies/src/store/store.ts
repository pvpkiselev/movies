import { createStore } from '@reduxjs/toolkit';
import moviesApp from './reducers';

const store = createStore(moviesApp);

export type MoviesAppState = ReturnType<typeof store.getState>;
export type MoviesAppDispatch = typeof store.dispatch;

export default store;
