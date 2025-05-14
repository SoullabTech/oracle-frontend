// 📁 Frontend: File - src/components/OracleChat.tsx

'use client';

import { PolarChart } from '@/components/PolarChart';
import VoiceRecorder from '@/components/VoiceRecorder';
import { useAuth } from '@/context/AuthContext'; // 🔹 Added for org-based voice config
import type { VoiceData } from '@/hooks/useOracleChat';
import { getVoiceProfile } from '@/lib/getVoiceProfile';
import { useState } from 'react';
import InsightModal from './InsightModal';

export default function OracleChat() {
  const { user } = useAuth(); // 🔹 Get orgId from user profile
  const voice = getVoiceProfile(user?.orgId); // 🔹 Dynamically fetch branded voice config

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [insight, setInsight] = useState<string | null>(null);
  const [ritual, setRitual] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [emotion, setEmotion] = useState('neutral');

  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [autoSendEnabled, setAutoSendEnabled] = useState(true);
  const [memoryLoggingEnabled, setMemoryLoggingEnabled] = useState(true);

  const handleSend = async (text: string) => {
    const userMessage = text.trim();
    if (!userMessage) return;

    setMessages((prev) => [...prev, { sender: 'user', content: userMessage }]);

    const response = await fetch('/api/oracle/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: userMessage, element: 'fire', phase: 1, emotion }),
    });

    const data = await response.json();
    setInsight(data.insight);
    setRitual(data.ritual);
    setModalOpen(true);
  };

  const handleTTS = (oracleResponse: string) => {
    if (ttsEnabled && typeof window !== 'undefined') {
      try {
        fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: oracleResponse, emotion }),
        })
          .then((res) => res.blob())
          .then((audioBlob) => {
            const audioURL = URL.createObjectURL(audioBlob);
            new Audio(audioURL).play();
          });
      } catch (error) {
        console.error('TTS fallback error:', error);
        const fallback = new SpeechSynthesisUtterance(oracleResponse);
        fallback.lang = 'en-US';
        window.speechSynthesis.speak(fallback);
      }
    }
  };

  const handleVoice = (voiceData: VoiceData) => {
    if (autoSendEnabled) {
      handleSend(voiceData.text);
    } else {
      setInput(voiceData.text);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 space-y-6">
      <h1 className="text-3xl font-bold text-center">{voice.uiLabels.chatHeader}</h1>

      <div className="flex flex-wrap gap-4 justify-center text-sm text-gray-700">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={ttsEnabled} onChange={() => setTtsEnabled(!ttsEnabled)} /> 🔊 TTS Enabled
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={autoSendEnabled} onChange={() => setAutoSendEnabled(!autoSendEnabled)} /> 🧠 Auto-Send Voice
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={memoryLoggingEnabled} onChange={() => setMemoryLoggingEnabled(!memoryLoggingEnabled)} /> 📂 Store to Memory
        </label>
      </div>

      <div className="flex items-center gap-2 justify-center">
        <label htmlFor="oracleVoice" className="text-sm font-medium">🎭 Oracle Voice</label>
        <select
          id="oracleVoice"
          value={emotion}
          onChange={(e) => setEmotion(e.target.value)}
          className="border rounded px-2 py-1 text-sm"
        >
          <option value="neutral">Neutral</option>
          <option value="joy">Joyful</option>
          <option value="sadness">Sad</option>
          <option value="anger">Angry</option>
          <option value="anxiety">Anxious</option>
        </select>
      </div>

      <div className="border p-4 rounded bg-white shadow space-y-3 max-h-[60vh] overflow-y-auto">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg whitespace-pre-wrap text-sm ${
              msg.sender === 'user' ? 'bg-emerald-100 text-right' : 'bg-indigo-100 text-left'
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={voice.uiLabels.chatPlaceholder}
        className="w-full p-3 border rounded shadow"
        rows={3}
      />

      <div className="flex flex-col md:flex-row gap-4">
        <button
          onClick={() => handleSend(input)}
          className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
        >
          {voice.uiLabels.sendButton}
        </button>
        <VoiceRecorder onTranscription={handleVoice} />
      </div>

      <PolarChart data={[]} />

      {modalOpen && (
        <InsightModal
          insight={insight!}
          ritual={ritual!}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
