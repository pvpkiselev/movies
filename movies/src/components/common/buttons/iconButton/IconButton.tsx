import { ReactNode } from 'react';
import iconButtonStyles from './IconButton.module.scss';
import classNames from 'classnames';

interface IconButtonProps {
  size: IconButtonSize;
  appearance: IconButtonAppearance;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

type IconButtonSize = 'large' | 'medium' | 'small';

type IconButtonAppearance = 'primary' | 'secondary' | 'tertiary';

export default function IconButton({
  size,
  appearance,
  type = 'button',
  disabled,
  onClick,
  children,
}: IconButtonProps) {
  return (
    <button
      className={classNames(
        iconButtonStyles.iconButton,
        iconButtonStyles[size],
        iconButtonStyles[appearance]
      )}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
