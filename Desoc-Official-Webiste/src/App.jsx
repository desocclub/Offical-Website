import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import CommitteePage from './pages/CommitteePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/committee" element={<CommitteePage />} />
      </Routes>
    </Router>
  );
}

export default App
