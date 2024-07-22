import React from 'react';
import styles from './Checkbox.module.scss';
import { Check } from 'lucide-react';

interface CheckboxProps {
  value: string;
  checked: boolean;
  children: React.ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Checkbox({
  value,
  checked,
  onChange,
  children,
}: CheckboxProps) {
  return (
    <label className={styles.checkbox}>
      <input
        className={styles.default}
        type="checkbox"
        id={`checkbox-${value}`}
        name={value}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span className={styles.button}>
        <Check className={styles.btnIcon} />
      </span>
      {children}
    </label>
  );
}
