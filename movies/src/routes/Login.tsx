import getTokenAuthentication from '@/api/auth/getTokenAuthentication';
import getUserId from '@/api/auth/getUserId';
import EmailModal from '@/components/modals/EmailModal';
import TokenModal from '@/components/modals/TokenModal';
import { login } from '@/store/auth/authActions';
import { useAppDispatch } from '@/store/store';
import { Box } from '@mui/material';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

type LoginModalType = 'email' | 'token' | null;

const Login = () => {
  const dispatch = useAppDispatch();
  const [step, setStep] = useState<LoginModalType>('email');

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
      const tokenVerification = await getTokenAuthentication(token);

      if (tokenVerification.success) {
        const userIdResponse = await getUserId(token);
        const userId = userIdResponse.id.toString();

        dispatch(login(token, userId));
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
};

export default Login;
