// src/lib/supabaseClient.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase'; // Assuming you have custom types for your database schema

// Supabase environment variables loaded from VITE prefix (defined in .env)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

// Create and initialize the Supabase client instance
const supabase: SupabaseClient<Database> = createClient(supabaseUrl, supabaseAnonKey);

// Auth Helpers
// Custom hook for handling authentication state
export const useAuth = () => {
  const { user, session, error } = supabase.auth.user();
  return { user, session, error };
};

// Fetch user profile information from the 'user_profiles' table
export const fetchUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', userId)
    .single(); // Single returns a single row, not an array

  if (error) {
    console.error("Error fetching user profile:", error);
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
    console.error("Error updating user profile:", error);
    return null;
  }

  return data;
};

// Helper function to sign out a user
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error signing out:", error.message);
  }
};

// Helper function for handling magic link login
export const signInWithMagicLink = async (email: string) => {
  const { error } = await supabase.auth.signInWithOtp({ email });
  if (error) {
    console.error("Error sending magic link:", error.message);
    return false;
  }
  return true;
};

// Helper to get current authenticated user
export const getUser = async () => {
  const user = await supabase.auth.getUser();
  return user;
};

// Table interaction functions for different user activities

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

// Function to handle insights for a memory
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

// Define a type for database operations (if using a generated type from Supabase)
export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          user_id: string;
          full_name: string;
          role: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          full_name: string;
          role: string;
        };
      };
      memories: {
        Row: {
          id: string;
          user_id: string;
          content: string;
          metadata: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          content: string;
          metadata: string;
        };
      };
      insights: {
        Row: {
          id: string;
          memory_id: string;
          analysis: string;
          created_at: string;
        };
        Insert: {
          memory_id: string;
          analysis: string;
        };
      };
    };
  };
};

// Export the supabase client instance
export { supabase };
