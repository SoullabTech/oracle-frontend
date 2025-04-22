import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../lib/supabaseClient';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-surface p-4">
      <div className="max-w-md w-full bg-white p-6 rounded-2xl shadow-deep">
        <h1 className="text-2xl font-display mb-4 text-center text-brand-dark">Login to your Oracle</h1>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="light"
          providers={['google']} // ✅ Customize this if needed
        />
      </div>
    </div>
  );
};

export default LoginPage;
