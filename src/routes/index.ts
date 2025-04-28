import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SpiralPortalPage from '@/pages/spiral-portal'; // or '@/routes/spiral-portal'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/spiral-portal" element={<SpiralPortalPage />} />
        {/* other routes */}
      </Routes>
    </BrowserRouter>
  );
}
