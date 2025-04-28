import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/landing';
import BetaPortalPage from './pages/beta-portal';
import LoginPage from './pages/login'; // Assuming you have this
import { useAuth } from '@supabase/auth-helpers-react'; // or wherever you manage auth

function App() {
  const { user } = useAuth(); // however you check user state

  return (
    <Router>
      <Routes>
        {/* 🌸 Home shows Landing */}
        <Route path="/" element={<LandingPage />} />

        {/* 🌀 Beta Portal (protected) */}
        <Route
          path="/beta-portal"
          element={user ? <BetaPortalPage /> : <Navigate to="/landing" />}
        />

        {/* 🔐 Login page */}
        <Route path="/login" element={<LoginPage />} />

        {/* 🌿 Catch-all unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
