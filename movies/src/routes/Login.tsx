import getTokenVerification from '@/api/auth/getTokenVerification';
import getUserId from '@/api/auth/getUserId';
import { setAxiosAuthToken } from '@/api/axiosConfig';
import EmailModal from '@/components/modals/EmailModal';
import TokenModal from '@/components/modals/TokenModal';
import { useAuthDispatch } from '@/hooks/useAuthDispatch';
import { Box } from '@mui/material';
import Cookies from 'js-cookie';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

type LoginModalType = 'email' | 'token' | null;

function Login() {
  const [step, setStep] = useState<LoginModalType>('email');
  const authDispatch = useAuthDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleEmailSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.email.value;
    Cookies.set('email', email);
    form.reset();
    setStep('token');
  };

  const handleTokenSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const token = form.token.value;

    try {
      const tokenVerification = await getTokenVerification(token);

      if (tokenVerification.success) {
        setAxiosAuthToken(token);
        const userIdResponse = await getUserId();
        const userId = userIdResponse.id.toString();

        authDispatch({ type: 'login_success', token, userId });
        Cookies.set('token', token);
        Cookies.set('userId', userId);
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

  return (
    <Box>
      <Toaster position="top-center" />
      <EmailModal open={step === 'email'} onSubmit={handleEmailSubmit} onClose={handleClose} />
      <TokenModal open={step === 'token'} onSubmit={handleTokenSubmit} onClose={handleClose} />
    </Box>
  );
}

export default Login;
