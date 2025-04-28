// src/hooks/useAuthInit.ts

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export function useAuthInit() {
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error getting session:', error.message);
      } else {
        console.log('Session:', session ? 'found' : 'not found');
      }
      setAuthReady(true);  // ✅ very important: set ready after checking
    }

    checkSession();
  }, []);

  return authReady;
}
