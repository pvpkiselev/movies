import getTokenVerification from '@/api/getTokenVerification';
import EmailModal from '@/components/modals/EmailModal';
import TokenModal from '@/components/modals/TokenModal';
import { useAuth } from '@/hooks/useAuth';
import { Box } from '@mui/material';
import Cookies from 'js-cookie';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [step, setStep] = useState(1);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleEmailSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.email.value;
    Cookies.set('email', email);
    form.reset();
    setStep(2);
  };

  const handleTokenSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const token = form.token.value;

    try {
      const tokenVerification = await getTokenVerification(token);

      if (tokenVerification.success) {
        Cookies.set('token', token);
        login(token);
        navigate('/');
      }
    } catch (error) {
      toast.error('Incorrect Token');
      console.error(error);
    } finally {
      form.reset();
    }
  };

  return (
    <Box>
      <Toaster position="top-center" />
      {step === 1 ? (
        <EmailModal onSubmit={handleEmailSubmit} />
      ) : (
        <TokenModal onSubmit={handleTokenSubmit} />
      )}
    </Box>
  );
}

export default Login;
