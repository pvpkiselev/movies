import IconButton from '@/components/common/buttons/iconButton/IconButton';
import styles from './AuthModal.module.scss';
import { X } from 'lucide-react';
import LoginForm from '../authForms/LoginForm';
import RegForm from '../authForms/RegForm';

interface AuthModalProps {
  isRegistered: boolean;
  onSwitch: () => void;
  isModalOpen: boolean;
  onToggleModal: () => void;
}

export default function AuthModal({
  isRegistered,
  onSwitch,
  isModalOpen,
  onToggleModal,
}: AuthModalProps) {
  return (
    <dialog open={isModalOpen} className={styles.modal}>
      <div className={styles.wrapper}>
        <IconButton size="medium" appearance="tertiary" type="button" onClick={onToggleModal}>
          <X />
        </IconButton>
        {isRegistered ? (
          <LoginForm onSwitch={onSwitch} onLogin={onToggleModal} />
        ) : (
          <RegForm onSwitch={onSwitch} />
        )}
      </div>
    </dialog>
  );
}
