import { EventSourcePolyfill } from 'event-source-polyfill';
import { useState } from 'react';

interface Message {
  from: 'user' | 'assistant' | 'tool';
  text: string;
}

export default function useChatInput() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;

    const userText = input;
    setMessages((m) => [...m, { from: 'user', text: userText }, { from: 'assistant', text: '' }]);
    setInput('');

    const url = `https://oracle-backend.onrender.com/api/chat/stream?prompt=${encodeURIComponent(userText)}`;
    const evt = new EventSourcePolyfill(url);

    let buffer = '';
    evt.onmessage = (e) => {
      const { text, role } = JSON.parse(e.data);
      buffer += text;
      setMessages((prev) =>
        prev.slice(0, -1).concat({ from: role === 'tool' ? 'tool' : 'assistant', text: buffer })
      );
    };

    evt.addEventListener('done', () => evt.close());
    evt.onerror = () => evt.close();
  };

  return { messages, input, setInput, sendMessage };
}
