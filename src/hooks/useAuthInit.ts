// src/hooks/useAuthInit.ts
import { useEffect } from 'react';
import { useUser } from '@supabase/auth-helpers-react';

export function useAuthInit() {
  const user = useUser();

  useEffect(() => {
    if (user?.id) {
      fetch('/api/auth/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id }),
      }).catch((err) => {
        console.error('❌ Failed to initialize user profile:', err);
      });
    }
  }, [user?.id]);
}
