import AuthModal from '@/components/modals/AuthModal';
import { useAuth } from '@/hooks/useAuth';
import { Box } from '@mui/material';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

type LoginSteps = 'email' | 'token' | null;

const Login = () => {
  const { handleLogin } = useAuth();
  const [step, setStep] = useState<LoginSteps>('email');

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleEmailSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStep('token');
  };

  const handleTokenSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const token = form.token.value;

    try {
      const signIn = await handleLogin(token);

      if (signIn) {
        navigate(from, { replace: true });
        setStep(null);
      }
    } catch (error) {
      toast.error('Incorrect Token');
      console.error(error);
    } finally {
      form.reset();
    }
  };

  const handleClose = () => {
    setStep(null);
    navigate(from, { replace: true });
  };

  const emailModalProps = {
    open: step === 'email',
    onSubmit: handleEmailSubmit,
    onClose: handleClose,
    title: 'Request Token',
    description: 'Please enter your email to which we will send a login token',
    id: 'email',
    name: 'email',
    label: 'Email Address',
    type: 'email' as const,
    buttonText: 'Request Token',
  };

  const tokenModalProps = {
    open: step === 'token',
    onSubmit: handleTokenSubmit,
    onClose: handleClose,
    title: 'Enter Token',
    description: 'Please enter the token that was sent by email',
    id: 'token',
    name: 'token',
    label: 'Token',
    type: 'text' as const,
    buttonText: 'OK',
  };

  return (
    <Box>
      <Toaster position="top-center" />
      <AuthModal {...emailModalProps} />
      <AuthModal {...tokenModalProps} />
    </Box>
  );
};

export default Login;
