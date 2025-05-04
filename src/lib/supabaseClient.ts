// src/lib/supabaseClient.ts
import { createClient, SupabaseClient, Session, User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { Database } from '@/types/supabase'; // Adjust if needed

// Env variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

// Create Supabase client
const supabase: SupabaseClient<Database> = createClient(supabaseUrl, supabaseAnonKey);

// --- AUTH HELPERS ---

export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) console.error('Error fetching session:', error);
        setSession(data?.session || null);
        setUser(data?.session?.user || null);
      } catch (e) {
        console.error('Unexpected error fetching session:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user || null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return { session, user, loading };
};

// --- Profile functions ---

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

// --- Auth functions ---

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out:', error.message);
  }
};

export const signInWithMagicLink = async (email: string) => {
  const { error } = await supabase.auth.signInWithOtp({ email });
  if (error) {
    console.error('Error sending magic link:', error.message);
    return false;
  }
  return true;
};

export const getUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error('Error fetching user:', error.message);
    return null;
  }
  return data?.user;
};

// --- Memory and Insights functions ---

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
  const { data, error } = await supabase.from('insights').select('*').eq('memory_id', memoryId);

  if (error) {
    console.error('Error fetching insights:', error);
    return [];
  }
  return data;
};

// Export supabase client
export { supabase };
