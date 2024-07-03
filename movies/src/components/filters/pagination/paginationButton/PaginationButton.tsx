import styles from './PaginationButton.module.scss';
import classNames from 'classnames';
import React from 'react';

interface PaginationButtonProps {
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export default function PaginationButton({
  active,
  disabled,
  onClick,
  children,
}: PaginationButtonProps) {
  return (
    <button
      className={classNames(styles.paginationButton, active && styles.active)}
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
