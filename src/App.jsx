import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import CommitteePage from './pages/CommitteePage';
import GenesisPage from './pages/GenesisPage';
import GenesisEventPage from './pages/GenesisEventPage';
import RegistrationPage from './pages/RegistrationPage';
import CSDDepartmentPage from './pages/CSDDepartmentPage';
import ContactPage from './pages/ContactPage';
import AlumniPage from './pages/AlumniPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/committee" element={<CommitteePage />} />
      <Route path="/genesis" element={<GenesisPage />} />
      <Route path="/genesis/events/:eventId" element={<GenesisEventPage />} />
      <Route path="/genesis/register" element={<RegistrationPage />} />
      <Route path="/csd-department" element={<CSDDepartmentPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/alumni" element={<AlumniPage />} />
    </Routes>
    </>
  );
}

export default App
