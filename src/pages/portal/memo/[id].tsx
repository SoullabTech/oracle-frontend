import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Memo {
  id: string;
  topic: string;
  summary: string;
  fullText: string;
  keywords: string[];
  created_at: string;
}

export default function MemoExpandPage() {
  const router = useRouter();
  const { id } = router.query;
  const [memo, setMemo] = useState<Memo | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchMemo = async () => {
      const res = await fetch(`/api/knowledge`);
      const data = await res.json();
      if (data?.memos?.length) {
        const found = data.memos.find((m: Memo) => m.id === id);
        setMemo(found || null);
      }
    };
    fetchMemo();
  }, [id]);

  if (!memo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-soullab-mist">
        <p className="text-lg text-soullab-twilight">Loading Memo...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soullab-mist p-8 flex flex-col items-center justify-center animate-fade-in">
      <div className="bg-white/80 p-8 rounded-2xl shadow-xl max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-center text-soullab-gold mb-6">{memo.topic}</h1>
        <p className="text-soullab-twilight text-center italic mb-8">{memo.summary}</p>
        <div className="prose prose-lg max-w-none text-soullab-earth">
          {memo.fullText.split('\n').map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={() => router.back()}
            className="bg-soullab-fire hover:bg-soullab-earth text-white font-semibold py-2 px-6 rounded-xl shadow-md transition-all"
          >
            🔙 Back to Portal
          </button>
        </div>
      </div>
    </div>
  );
}
