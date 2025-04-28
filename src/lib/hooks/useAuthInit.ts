import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export function useAuthInit() {
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        console.log("Session found:", session);
      } else {
        console.log("No active session");
      }
      setAuthReady(true);
    }
    checkSession();
  }, []);

  return authReady;
}
