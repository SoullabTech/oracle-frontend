import ChatInterface from '@/components/ChatInterface';
import VoiceProfileSelector from '@/components/VoiceProfileSelector';

export default function ChatPage() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <VoiceProfileSelector />
      <ChatInterface />
    </div>
  );
}
