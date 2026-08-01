import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/:slug" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
