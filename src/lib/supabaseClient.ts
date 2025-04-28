// src/lib/supabaseClient.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { Database } from '@/types/supabase'; // Adjust this if your Database type is elsewhere

// Load Supabase environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

// Create and initialize the Supabase client instance
const supabase: SupabaseClient<Database> = createClient(supabaseUrl, supabaseAnonKey);

// --------------
// AUTH HELPERS
// --------------

// Custom React hook to get the current authenticated session
export const useAuth = () => {
  const [session, setSession] = useState<ReturnType<typeof supabase.auth.getSession> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) console.error('Error fetching session:', error);
      setSession(data?.session || null);
      setLoading(false);
    };

    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return { session, loading };
};

// Helper function to fetch user profile information
export const fetchUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', userId)
    .single(); // Single returns a single row

  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
  return data;
};

// Function to update the user profile
export const updateUserProfile = async (userId: string, profileData: { full_name?: string, role?: string }) => {
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

// Function to sign out a user
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out:', error.message);
  }
};

// Function to sign in with a magic link
export const signInWithMagicLink = async (email: string) => {
  const { error } = await supabase.auth.signInWithOtp({ email });
  if (error) {
    console.error('Error sending magic link:', error.message);
    return false;
  }
  return true;
};

// Fetch the current authenticated user
export const getUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error('Error fetching user:', error.message);
    return null;
  }
  return data.user;
};

// --------------
// MEMORY AND INSIGHT FUNCTIONS
// --------------

// Fetch memories for a specific user
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

// Create a new memory
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

// Fetch insights linked to a specific memory
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

// --------------
// EXPORT SUPABASE CLIENT
// --------------

export { supabase };
