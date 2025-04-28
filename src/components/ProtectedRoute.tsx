import React, { ReactNode, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        // 🚪 Not authenticated → redirect to login
        navigate('/login', { state: { from: location }, replace: true });
      } else {
        setLoading(false);
      }
    }

    checkAuth();
  }, [navigate, location]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-pink-50 to-yellow-50">
        <p className="text-xl text-indigo-700 animate-pulse">Preparing your Portal...</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
