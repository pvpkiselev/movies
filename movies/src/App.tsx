import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import { theme } from '@/theme/theme';

import ErrorPage from '@/routes/ErrorPage';
import Root from '@/routes/Root';
import Home from '@/routes/Home';
import MoviePage from '@/routes/MoviePage';
import { movieInfoLoader } from '@/loaders/movieInfoLoader';
import Login from './routes/Login';
import { store } from './store/store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/movies" replace />,
      },
      {
        path: 'movies',
        element: <Home />,
      },
      {
        path: 'movies/:movieId',
        element: <MoviePage />,
        loader: movieInfoLoader,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  );
}
