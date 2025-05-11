// src/components/OracleChat.tsx

'use client';

import { useState } from 'react';
import InsightModal from './InsightModal'; // Modal for displaying insights
import { PolarChart } from '@/components/PolarChart'; // Your PolarChart component
import VoiceRecorder from '@/components/VoiceRecorder';
import { useOracleChat } from '@/hooks/useOracleChat';
import type { VoiceData } from '@/hooks/useOracleChat';

export default function OracleChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [insight, setInsight] = useState<string | null>(null); // Insight state
  const [ritual, setRitual] = useState<string | null>(null); // Ritual state
  const [modalOpen, setModalOpen] = useState(false);
  const [emotion, setEmotion] = useState('neutral'); // Emotion state for TTS

  // 🧹 Feature Toggles
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [autoSendEnabled, setAutoSendEnabled] = useState(true);
  const [memoryLoggingEnabled, setMemoryLoggingEnabled] = useState(true);

  // Query Send Handler
  const handleSend = async (text: string) => {
    const userMessage = text.trim();
    if (!userMessage) return;

    setMessages((prev) => [...prev, { sender: 'user', content: userMessage }]);

    const response = await fetch('/api/oracle/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: userMessage, element: 'fire', phase: 1, emotion: emotion }), // Placeholder
    });

    const data = await response.json();
    setInsight(data.insight); // Set insight from backend response
    setRitual(data.ritual); // Set ritual from backend response
    setModalOpen(true); // Open modal to show insight
  };

  // TTS Playback Function
  const handleTTS = (oracleResponse: string) => {
    if (ttsEnabled && typeof window !== 'undefined') {
      try {
        const ttsRes = fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: oracleResponse, emotion: emotion }),
        });

        ttsRes
          .then((res) => res.blob())
          .then((audioBlob) => {
            const audioURL = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioURL);
            audio.play();
          });
      } catch (error) {
        console.error('TTS fallback error:', error);
        const fallback = new SpeechSynthesisUtterance(oracleResponse);
        fallback.lang = 'en-US';
        window.speechSynthesis.speak(fallback);
      }
    }
  };

  // Handling Voice Data from VoiceRecorder
  const handleVoice = (voiceData: VoiceData) => {
    if (autoSendEnabled) {
      handleSend(voiceData.text, voiceData.element, voiceData.phase, voiceData.emotion);
    } else {
      setInput(voiceData.text);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 space-y-6">
      <h1 className="text-3xl font-bold text-center">🌀 Oracle Summoning Portal</h1>

      {/* 🧩 Feature Toggles */}
      <div className="flex flex-wrap gap-4 justify-center text-sm text-gray-700">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={ttsEnabled} onChange={() => setTtsEnabled(!ttsEnabled)} />
          🔊 TTS Enabled
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={autoSendEnabled}
            onChange={() => setAutoSendEnabled(!autoSendEnabled)}
          />
          🧠 Auto-Send Voice
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={memoryLoggingEnabled}
            onChange={() => setMemoryLoggingEnabled(!memoryLoggingEnabled)}
          />
          📂 Store to Memory
        </label>
      </div>

      {/* 🎭 Oracle Voice Selector */}
      <div className="flex items-center gap-2 justify-center">
        <label htmlFor="oracleVoice" className="text-sm font-medium">
          🎭 Oracle Voice
        </label>
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

      {/* 💬 Message Log */}
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

      {/* ✍️ Manual Input */}
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Speak your truth..."
        className="w-full p-3 border rounded shadow"
        rows={3}
      />

      {/* 🎤 Voice + Controls */}
      <div className="flex flex-col md:flex-row gap-4">
        <button
          onClick={() => handleSend(input)}
          className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
        >
          Send
        </button>
        <VoiceRecorder onTranscription={handleVoice} />
      </div>

      {/* 🧩 Polar Chart */}
      <PolarChart data={facets} />

      {/* 🔮 Insight Modal */}
      {modalOpen && (
        <InsightModal
          insight={insight!} // Insight is guaranteed to be not null when the modal is open
          ritual={ritual!} // Ritual is guaranteed to be not null when the modal is open
          onClose={() => setModalOpen(false)} // Close the modal on click
        />
      )}
    </div>
  );
}
