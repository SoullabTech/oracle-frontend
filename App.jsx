import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import FacilitatorPage from './pages/facilitator';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Default route redirects to Facilitator Dashboard */}
        <Route path="/" element={<Navigate to="/facilitator" replace />} />

        {/* Facilitator Dashboard */}
        <Route path="/facilitator" element={<FacilitatorPage />} />

        {/* Placeholder for future routes */}
        {/* <Route path="/oracle" element={<OracleDashboard />} /> */}
        {/* <Route path="/dashboard" element={<MainDashboard />} /> */}
      </Routes>
    </Router>
  );
}<div className="bg-soullab-aether text-white p-4 rounded-xl">
  Tailwind is working ✨
</div>

