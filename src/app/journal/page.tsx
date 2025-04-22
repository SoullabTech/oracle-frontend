// ✅ FRONTEND - 📁 /src/app/journal/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

type OracleLog = {
  id: string;
  input: string;
  insight: string;
  ritual: string;
  phase: string;
  element: string;
  created_at: string;
};

export default function JournalPage() {
  const [logs, setLogs] = useState<OracleLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from('oracle_logs')
        .select('*')
        .eq('user_email', user.email)
        .order('created_at', { ascending: false });

      if (!error && data) setLogs(data);
      setLoading(false);
    };

    fetchLogs();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📝 Your Oracle Journal</h1>

      {loading && <p>Loading...</p>}

      {logs.length === 0 && !loading && <p>No entries yet. Speak with the Oracle to begin.</p>}

      <div className="space-y-6">
        {logs.map((log) => (
          <div key={log.id} className="p-4 border rounded shadow bg-slate-50">
            <div className="text-sm text-gray-500 mb-2">
              {new Date(log.created_at).toLocaleString()} • {log.phase} ({log.element})
            </div>
            <p className="font-semibold mb-2">🗣️ {log.input}</p>
            <p className="whitespace-pre-wrap mb-2">🌟 {log.insight}</p>
            <p className="italic text-emerald-700">🕯️ Ritual: {log.ritual}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
