import styles from './Header.module.scss';
import Button from '@components/common/buttons/Button';

interface HeaderProps {}

export default function Header() {
  return (
    <header className={styles.header}>
      <a href="#">Фильмы</a>
      <Button appearance="tertiary" size="medium" type="button">
        Войти
      </Button>
    </header>
  );
}
