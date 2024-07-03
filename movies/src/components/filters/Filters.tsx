import styles from './Filters.module.scss';
import { X } from 'lucide-react';
import IconButton from '../common/buttons/iconButton/IconButton';
import Pagination from './pagination/Pagination';
import classNames from 'classnames';
import Button from '../common/buttons/button/Button';
import SortSelect from './sortSelect/SortSelect';
import YearSelect from './yearSelect/YearSelect';
import GenreCheckboxGroup from './checkboxGroup/GenreCheckboxGroup';
import ResetButton from './resetButton/ResetButton';

interface FiltersProps {
  isOpen: boolean;
  onFiltersOpen: () => void;
  onFiltersClose: () => void;
}

export default function Filters(props: FiltersProps) {
  const { isOpen, onFiltersOpen, onFiltersClose } = props;

  return (
    <div>
      <div className={styles.showFiltersButton}>
        <Button size="medium" appearance="primary" onClick={onFiltersOpen}>
          Фильтры
        </Button>
      </div>
      <div className={classNames(styles.filters, isOpen && styles.shown)}>
        <div className={styles.header}>
          <h3 className={styles.title}>Фильтры</h3>
          <div className={styles.closeFiltersButton}>
            <IconButton appearance="tertiary" size="medium" onClick={onFiltersClose}>
              <X />
            </IconButton>
          </div>
        </div>
        <SortSelect />
        <YearSelect />
        <GenreCheckboxGroup />
        <ResetButton />
        <Pagination />
      </div>
    </div>
  );
}
