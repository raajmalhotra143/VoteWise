import { Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';

interface SpeechButtonProps {
  text: string;
}

export const SpeechButton = ({ text }: SpeechButtonProps) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  return (
    <button 
      onClick={speak}
      className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition text-[#FF6B00]"
      title={isSpeaking ? "Stop Reading" : "Read Aloud"}
    >
      {isSpeaking ? <VolumeX size={18} /> : <Volume2 size={18} />}
    </button>
  );
};
