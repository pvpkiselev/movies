import { useEffect, useState } from 'react';
import AuthModal from './authModal/AuthModal';

export default function Authorization() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleSwitchModal = () => setIsRegistered(!isRegistered);
  const handleToggleModal = () => setIsModalOpen(!isModalOpen);

  useEffect(() => {
    if (!isRegistered) {
      setIsModalOpen(true);
    }
  }, [isRegistered]);

  return (
    <AuthModal
      isRegistered={isRegistered}
      onSwitch={handleSwitchModal}
      isModalOpen={isModalOpen}
      onToggleModal={handleToggleModal}
    />
  );
}
