import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root.tsx';
import ErrorPage from './routes/ErrorPage.tsx';
import Home from './routes/Home.tsx';
import MoviePage from './routes/MoviePage.tsx';
import { movieInfoLoader } from './loaders/movieInfoLoader.ts';

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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
