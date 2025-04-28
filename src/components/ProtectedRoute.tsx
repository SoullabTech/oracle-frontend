// src/components/ProtectedRoute.tsx
import React, { ReactNode, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
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
        // Not authenticated → redirect to login, preserve destination
        navigate('/login', { state: { from: location }, replace: true });
      } else {
        setLoading(false);
      }
    }

    checkAuth();
  }, [navigate, location]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
};

// src/hooks/useOracleCheck.ts
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';

export function useOracleCheck() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function checkOracle() {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) return; // Not logged in

      const { data, error } = await supabase
        .from('user_oracles')
        .select('oracle_id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Oracle check error:', error.message);
        return;
      }

      // If no oracle and not already on ceremony or blessing pages, redirect
      if (!data && !location.pathname.startsWith('/ceremony') && !location.pathname.startsWith('/blessing')) {
        navigate('/ceremony', { replace: true });
      }
    }

    checkOracle();
  }, [navigate, location]);
}
