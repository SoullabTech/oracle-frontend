// apps/frontend/src/lib/supabaseClient.ts

import { Database } from '@/types/supabase'; // adjust path if needed
import { createClient, Session, SupabaseClient, User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

// ——————————————————————————————————————————
// 1. Read VITE_* env vars injected by Vite
// ——————————————————————————————————————————
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// ——————————————————————————————————————————
// 2. Validate at startup
// ——————————————————————————————————————————
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('❌ Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in your .env file');
}

// ——————————————————————————————————————————
// 3. Create the typed Supabase client
// ——————————————————————————————————————————
export const supabase: SupabaseClient<Database> = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
);

// ——————————————————————————————————————————
// 4. React hooks for auth state
// ——————————————————————————————————————————
export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // initial session fetch
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) console.error('Error fetching session:', error);
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    // subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { session, user, loading };
};

// ——————————————————————————————————————————
// 5. Profile management
// ——————————————————————————————————————————
export const fetchUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
  return data;
};

export const updateUserProfile = async (
  userId: string,
  profileData: { full_name?: string; role?: string },
) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .update(profileData)
    .eq('user_id', userId);

  if (error) {
    console.error('Error updating user profile:', error);
    return null;
  }
  return data;
};

// ——————————————————————————————————————————
// 6. Auth actions
// ——————————————————————————————————————————
export const signInWithMagicLink = async (email: string) => {
  const { error } = await supabase.auth.signInWithOtp({ email });
  if (error) {
    console.error('Error sending magic link:', error.message);
    return false;
  }
  return true;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out:', error.message);
  }
};

export const getUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error('Error fetching user:', error.message);
    return null;
  }
  return data.user;
};

// ——————————————————————————————————————————
// 7. Memory & Insights CRUD
// ——————————————————————————————————————————
export const fetchMemories = async (userId: string) => {
  const { data, error } = await supabase
    .from('memories')
    .select('id, content, metadata, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching memories:', error);
    return [];
  }
  return data;
};

export const createMemory = async (userId: string, content: string, metadata: string) => {
  const { data, error } = await supabase
    .from('memories')
    .insert([{ content, metadata, user_id: userId }]);

  if (error) {
    console.error('Error creating memory:', error);
    return null;
  }
  return data;
};

export const fetchInsightsForMemory = async (memoryId: string) => {
  const { data, error } = await supabase
    .from('insights')
    .select('*')
    .eq('memory_id', memoryId);

  if (error) {
    console.error('Error fetching insights:', error);
    return [];
  }
  return data;
};
