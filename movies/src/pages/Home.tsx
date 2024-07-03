import styles from './Home.module.scss';
import { useState } from 'react';
import Filters from '../components/filters/Filters';
import Movies from '../components/movies/Movies';
import Layout from '../components/layout/Layout';
import { FilterProvider } from '@/contexts/filterContext/filterProvider';

export default function Home() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  return (
    <FilterProvider>
      <Layout>
        <div className={styles.container}>
          <Filters
            isOpen={isFiltersOpen}
            onFiltersOpen={() => setIsFiltersOpen(true)}
            onFiltersClose={() => setIsFiltersOpen(false)}
          />
          <Movies />
        </div>
      </Layout>
    </FilterProvider>
  );
}
