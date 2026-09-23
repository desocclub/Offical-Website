import { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import './App.css'
import Home from './views/Home';
import PastEventsPage from './views/PastEventsPage';
import PastEventDetailPage from './views/PastEventDetailPage';
import CommitteePage from './views/CommitteePage';
import GenesisPage from './views/GenesisPage';
import GenesisEventPage from './views/GenesisEventPage';
import SharkverseEventPage from './views/SharkverseEventPage';
import BidAndBuildEventPage from './views/BidAndBuildEventPage';
import BidAndBuildPage from './views/BidAndBuildPage';
import EscapeTheMatrixEventPage from './views/EscapeTheMatrixEventPage';
import RegistrationPage from './views/RegistrationPage';
import CSDDepartmentPage from './views/CSDDepartmentPage';
import ContactPage from './views/ContactPage';
import AlumniPage from './views/AlumniPage';
import AboutPage from './views/AboutPage';
import CustomCursor from './components/CustomCursor';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}


function App() {
  return (
    <>
    <CustomCursor />
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
