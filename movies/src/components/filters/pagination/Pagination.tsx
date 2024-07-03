import React from 'react';
import styles from './Pagination.module.scss';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PaginationButton from './paginationButton/PaginationButton';

// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
//   onPageChange: React.Dispatch<React.SetStateAction<number>>;
// }

export default function Pagination() {
  const pages = [1, 2, 3, 4];

  return (
    <nav>
      <ul className={styles.pagination}>
        <li>
          <PaginationButton>
            <ChevronLeft />
          </PaginationButton>
        </li>
        {pages.map((page) => (
          <li key={page}>
            <PaginationButton>{page}</PaginationButton>
          </li>
        ))}
        <li>
          <PaginationButton>
            <ChevronRight />
          </PaginationButton>
        </li>
      </ul>
    </nav>
  );
}
