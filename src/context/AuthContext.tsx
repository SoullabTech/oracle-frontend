// src/context/AuthContext.tsx
import { Session, User } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

// 1. Define the AuthContext types
interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
}

// 2. Create the actual context
const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
});

// 3. Provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error loading session:', error.message);
      } else {
        setSession(data.session);
        setUser(data.session?.user ?? null);
      }
      setLoading(false);
    };

    loadSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const value: AuthContextType = { session, user, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 4. Hook to easily use the context
export function useAuth() {
  return useContext(AuthContext);
}
