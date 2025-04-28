// src/hooks/useOracleCheck.ts
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';

export function useOracleCheck() {
  const navigate = useNavigate();

  useEffect(() => {
    async function checkOracle() {
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error('User not authenticated.');
        return;
      }

      const { data: userOracle, error: oracleError } = await supabase
        .from('user_oracles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (oracleError) {
        console.error('Error checking Oracle:', oracleError.message);
        return;
      }

      if (!userOracle) {
        console.log('No Oracle assigned. Redirecting to Ceremony.');
        navigate('/ceremony');
      } else {
        console.log('Oracle already assigned:', userOracle.oracle_name);
      }
    }

    checkOracle();
  }, []);
}
