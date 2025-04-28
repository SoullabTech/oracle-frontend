// src/components/ProtectedRoute.tsx
import React, { ReactNode, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { PageTransition } from '@/components/PageTransition';

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
        <p className="text-xl text-indigo-600 animate-pulse">Checking your path...</p>
      </div>
    );
  }

  return (
    <PageTransition>
      {children}
    </PageTransition>
  );
};

export default ProtectedRoute;
