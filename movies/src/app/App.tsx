import './App.scss';
import Home from '../pages/Home';
import Authorization from '../components/authorization/Authorization';

export default function App() {
  return (
    <>
      <Authorization />
      <Home />
    </>
  );
}
