import styles from './CheckboxGroup.module.scss';
import type { Genre } from '@/types/Genre';
import Checkbox from '@components/common/checkbox/Checkbox';

interface CheckboxGroupProps {
  options: Genre[];
  title: string;
  selectedIds: Set<number>;
  onCheckboxChange: (id: number) => void;
}

export default function CheckboxGroup({
  options,
  title,
  selectedIds,
  onCheckboxChange,
}: CheckboxGroupProps) {
  return (
    <div className={styles.checkboxGroup}>
      <h4 className={styles.title}>{title}</h4>
      <ul className={styles.list}>
        {options.map((option) => (
          <li key={option.id}>
            <Checkbox
              value={option.name}
              checked={selectedIds.has(option.id)}
              onChange={() => onCheckboxChange(option.id)}
            >
              {option.name}
            </Checkbox>
          </li>
        ))}
      </ul>
    </div>
  );
}
