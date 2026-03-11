import { Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import CommitteePage from './pages/CommitteePage';
import GenesisPage from './pages/GenesisPage';
import GenesisEventPage from './pages/GenesisEventPage';
import RegistrationPage from './pages/RegistrationPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/committee" element={<CommitteePage />} />
      <Route path="/genesis" element={<GenesisPage />} />
      <Route path="/genesis/events/:eventId" element={<GenesisEventPage />} />
      <Route path="/genesis/register" element={<RegistrationPage />} />
    </Routes>
  );
}

export default App
