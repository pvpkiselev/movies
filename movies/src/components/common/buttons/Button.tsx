import React, { ReactNode } from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames';

interface ButtonProps {
  size: ButtonSize;
  appearance: ButtonAppearance;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

type ButtonSize = 'large' | 'medium' | 'small';

type ButtonAppearance = 'primary' | 'secondary' | 'tertiary';

export default function Button({
  size,
  appearance,
  type = 'button',
  disabled,
  onClick,
  children,
}: ButtonProps) {
  return (
    <button
      className={classNames(styles.button, styles[size], styles[appearance])}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
