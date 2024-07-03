import { ReactNode } from 'react';
import styles from './Layout.module.scss';
import Header from './header/Header';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.layout}>
      <Header />
      {children}
    </div>
  );
}
