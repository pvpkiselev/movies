import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './authorization/authReducer';

const moviesApp = combineReducers({
  authReducer,
});

export default moviesApp;
