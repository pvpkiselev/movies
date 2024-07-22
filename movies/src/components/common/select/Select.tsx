import React from 'react';
import styles from './Select.module.scss';

interface SelectProps {
  label: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}

export default function Select({
  label,
  name,
  value,
  onChange,
  options,
}: SelectProps) {
  return (
    <div className={styles.selectBlock}>
      <label className={styles.label}>{label}</label>
      <select
        className={styles.button}
        name={name}
        value={value}
        onChange={onChange}
      >
        {options.map((option: string) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
