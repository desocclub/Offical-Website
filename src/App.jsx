import { Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import CommitteePage from './pages/CommitteePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/committee" element={<CommitteePage />} />
    </Routes>
  );
}

export default App
