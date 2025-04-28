import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '@/pages/landing';
import BetaPortalPage from '@/pages/beta-portal';
import LoginPage from '@/pages/login'; // Make sure you have this file
import { useAuth } from '@supabase/auth-helpers-react'; // Good!

function App() {
  const { user } = useAuth(); // Gets current user session

  return (
    <Router>
      <Routes>
        {/* 🌸 Landing page */}
        <Route path="/" element={<LandingPage />} />

        {/* 🌀 Beta Portal (only if logged in) */}
        <Route
          path="/beta-portal"
          element={user ? <BetaPortalPage /> : <Navigate to="/login" />}
        />

        {/* 🔐 Login page */}
        <Route path="/login" element={<LoginPage />} />

        {/* 🌿 Catch-all unknown routes -> home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
