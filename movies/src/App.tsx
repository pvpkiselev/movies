import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/theme/theme';
import { CssBaseline } from '@mui/material';
import ErrorPage from '@/routes/ErrorPage';
import Root from '@/routes/Root';
import Home from '@/routes/Home';
import MoviePage from '@/routes/MoviePage';
import { movieInfoLoader } from '@/loaders/movieInfoLoader';
import { AuthProvider } from '@/contexts/authContext/AuthProvider';
import Login from './routes/Login';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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
  {
    path: '/login',
    element: <Login />,
  },
]);

//TODO Реализовать доступность Header из любой части приложения
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        {/* <Header /> */}
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}
