import { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import PastEventsPage from './pages/PastEventsPage';
import PastEventDetailPage from './pages/PastEventDetailPage';
import CommitteePage from './pages/CommitteePage';
import GenesisPage from './pages/GenesisPage';
import GenesisEventPage from './pages/GenesisEventPage';
import SharkverseEventPage from './pages/SharkverseEventPage';
import BidAndBuildEventPage from './pages/BidAndBuildEventPage';
import BidAndBuildPage from './pages/BidAndBuildPage';
import EscapeTheMatrixEventPage from './pages/EscapeTheMatrixEventPage';
import RegistrationPage from './pages/RegistrationPage';
import CSDDepartmentPage from './pages/CSDDepartmentPage';
import ContactPage from './pages/ContactPage';
import AlumniPage from './pages/AlumniPage';
import AboutPage from './pages/AboutPage';

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
      <Route path="/events" element={<PastEventsPage />} />
      <Route path="/events/:eventId" element={<PastEventDetailPage />} />
      <Route path="/committee" element={<CommitteePage />} />
      <Route path="/genesis" element={<GenesisPage />} />
      <Route path="/genesis/events/sharkverse" element={<SharkverseEventPage />} />
      <Route path="/genesis/events/bid-and-build" element={<BidAndBuildEventPage />} />
      <Route path="/bid-and-build" element={<BidAndBuildPage />} />
      <Route path="/genesis/events/escape-the-matrix" element={<EscapeTheMatrixEventPage />} />
      <Route path="/genesis/events/:eventId" element={<GenesisEventPage />} />
      <Route path="/genesis/register" element={<RegistrationPage />} />
      <Route path="/csd-department" element={<CSDDepartmentPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/alumni" element={<AlumniPage />} />
      <Route path="/recruitment" element={<Navigate to="/" replace />} />
    </Routes>
    </>
  );
}

export default App
