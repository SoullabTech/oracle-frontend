// src/services/userService.ts
import { supabase } from '@lib/supabaseClient';
import logger from '@utils/logger';

interface CrystalFocus {
  type: string;
  challenges: string;
  aspirations: string;
}

/**
 * Creates a new elemental profile if the user doesn't already have one.
 */
export async function initializeUserIfNeeded(userId: string): Promise<void> {
  try {
    const { data: existing, error } = await supabase
      .from('elemental_profiles')
      .select('user_id')
      .eq('user_id', userId)
      .single();

    // Allow "not found" error but log and exit on others
    if (error && error.code !== 'PGRST116') {
      logger.error('❌ Failed to check if user exists:', error);
      return;
    }

    if (!existing) {
      const { error: insertError } = await supabase.from('elemental_profiles').insert([
        {
          user_id: userId,
          fire: 0,
          water: 0,
          air: 0,
          earth: 0,
          aether: 0,
          crystal_focus: {
            type: '',
            challenges: '',
            aspirations: '',
          } as CrystalFocus,
        },
      ]);

      if (insertError) {
        logger.error('❌ Failed to create new user profile:', insertError);
      } else {
        logger.info(`✨ New Oracle profile initialized for: ${userId}`);
      }
    } else {
      logger.info(`✅ User profile already exists: ${userId}`);
    }
  } catch (err: any) {
    logger.error('❌ Error during user profile initialization:', {
      userId,
      error: err.message || err,
    });
  }
}
