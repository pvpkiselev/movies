import styles from './Home.module.scss';
import { useEffect, useState } from 'react';
import Filters from '../components/filters/Filters';
import Movies from '../components/movies/Movies';
import movies from '../data/movies.json';
import Layout from '../components/layout/Layout';

interface HomeProps {}

export default function Home() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentMovies, setCurrentMovies] = useState([]);

  const moviesPerPage = 5;
  const totalMovies = movies.length;
  const totalPages = Math.ceil(totalMovies / moviesPerPage);

  useEffect(() => {
    const startIndex = (currentPage - 1) * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    const newCurrentMovies = movies.slice(startIndex, endIndex);
    setCurrentMovies(newCurrentMovies);
  }, [currentPage, movies]);

  return (
    <Layout>
      <div className={styles.container}>
        <Filters
          isOpen={isFiltersOpen}
          onFiltersOpen={() => setIsFiltersOpen(true)}
          onFiltersClose={() => setIsFiltersOpen(false)}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
        <Movies movies={currentMovies} />
      </div>
    </Layout>
  );
}
