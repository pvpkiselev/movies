import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/theme/theme';
import { CssBaseline } from '@mui/material';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from '@/routes/ErrorPage';
import Root from '@/routes/Root';
import Home from '@/routes/Home';
import MoviePage from '@/routes/MoviePage';
import { movieInfoLoader } from '@/loaders/movieInfoLoader';
import { AuthProvider } from '@/contexts/authContext/AuthProvider';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'movies/:movieId',
        element: <MoviePage />,
        loader: movieInfoLoader,
      },
    ],
  },
]);

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}
