// src/hooks/useAuth.ts
import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient'; // Adjust path if needed

// Define a type for Supabase Session

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Fetch current session
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error.message);
      } else {
        setSession(data.session);
      }
      setLoading(false);
    };

    fetchSession();

    // 2. Subscribe to auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    // 3. Cleanup on unmount
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return { session, loading };
}
