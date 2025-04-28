// src/utils/withAuth.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';

export function withAuth<P>(WrappedComponent: React.ComponentType<P>) {
  return function ProtectedComponent(props: P) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState<any>(null);

    useEffect(() => {
      const getSession = async () => {
        const { data } = await supabase.auth.getSession();
        if (!data.session) {
          router.push('/login');
        } else {
          setSession(data.session);
        }
        setLoading(false);
      };
      getSession();

      const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
        if (!session) {
          router.push('/login');
        }
      });

      return () => {
        listener.subscription.unsubscribe();
      };
    }, [router]);

    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <p>Loading sacred portal...</p>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
}
