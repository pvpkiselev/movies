import './App.scss';
import Home from '../pages/Home';
import Authorization from '../components/authorization/Authorization';
import { UserProvider } from '@/contexts/userContext/userProvider';

export default function App() {
  return (
    <UserProvider>
      <Authorization />
      <Home />
    </UserProvider>
  );
}
