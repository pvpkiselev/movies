import './App.scss';
import { UserProvider } from '@/contexts/userContext/userProvider';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/theme/theme';
import { CssBaseline } from '@mui/material';
import Home from '../components/pages/Home';
import Authorization from '@/components/authorization/Authorization';

export default function App() {
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Authorization />
        <Home />
      </ThemeProvider>
    </UserProvider>
  );
}
