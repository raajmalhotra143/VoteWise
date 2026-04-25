import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { saveMessage } from '../lib/supabase';
import { sendMessageToAI } from '../lib/aiService';
import { motion } from 'framer-motion';
import { Send, Bot, User, PlusCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const SYSTEM_PROMPT = "You are VoteWise, an expert and friendly AI assistant specialized in Indian election processes. You help Indian citizens, especially first-time voters, understand everything about elections. Always base your answers on official Election Commission of India (ECI) guidelines. Structure your answers with clear bullet points or numbered steps when explaining processes. Keep language simple and beginner-friendly. When relevant, mention official ECI website (eci.gov.in) or Voter Helpline 1950. Never provide political opinions or support any political party. If asked about anything unrelated to elections or civic education, politely redirect the conversation. Always end complex answers with: 'For official information, visit eci.gov.in or call Voter Helpline 1950.'";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Chat() {
  const { user } = useAuth();
  const location = useLocation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(() => crypto.randomUUID());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "How do I register to vote?",
    "What is NOTA?",
    "How does EVM work?",
    "What is Model Code of Conduct?",
    "Who is eligible to vote in India?"
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (location.state && location.state.initialQuery && messages.length === 0) {
      handleSend(location.state.initialQuery);
    }
  }, [location.state]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    
    // Check guest limit
    if (!user) {
      const guestCount = parseInt(localStorage.getItem('guestMsgCount') || '0');
      if (guestCount >= 5) {
        setMessages(prev => [...prev, { role: 'assistant', content: 'You have reached the 5 message limit for guest users. Please log in or sign up to continue chatting!' }]);
        return;
      }
      localStorage.setItem('guestMsgCount', (guestCount + 1).toString());
    }

    const newUserMsg: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, newUserMsg]);
    setInput('');
    setLoading(true);

    try {
      if (user) {
        await saveMessage(sessionId, 'user', text, user.uid);
      }

      // Convert messages to anthropic format
      const apiMessages = [...messages, newUserMsg].map(m => ({ role: m.role, content: m.content }));
      
      const aiResponse = await sendMessageToAI(apiMessages, SYSTEM_PROMPT);
      
      const newAiMsg: Message = { role: 'assistant', content: aiResponse };
      setMessages(prev => [...prev, newAiMsg]);
      
      if (user) {
        await saveMessage(sessionId, 'assistant', aiResponse, user.uid);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'AI is temporarily unavailable. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  const startNewChat = () => {
    setSessionId(crypto.randomUUID());
    setMessages([]);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col md:flex-row h-[80vh] gap-6"
    >
      {/* Sidebar - Desktop Only */}
      <div className="hidden md:flex flex-col w-64 glass-card p-4 h-full">
        <button 
          onClick={startNewChat}
          className="flex items-center gap-2 w-full bg-[#1B2F5E] text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition mb-6"
        >
          <PlusCircle size={20} />
          New Chat
        </button>
        
        <div className="flex-1 overflow-y-auto">
          <h3 className="text-xs font-bold uppercase text-slate-500 mb-3 tracking-wider">Current Session</h3>
          <div className="text-sm p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium truncate">
            {messages.length > 0 ? messages[0].content : 'Empty Chat'}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          {!user && (
            <p className="text-xs text-rose-500 mb-2">Guest mode: {5 - parseInt(localStorage.getItem('guestMsgCount') || '0')} messages left</p>
          )}
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="User" className="w-8 h-8 rounded-full" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-700 flex items-center justify-center">
                <User size={16} />
              </div>
            )}
            <span className="truncate">{user?.displayName || 'Guest User'}</span>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col glass-card h-full overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-4">
                <Bot size={32} />
              </div>
              <h2 className="text-2xl font-headline font-bold text-[#1B2F5E] dark:text-white mb-2">How can I help you?</h2>
              <p className="text-slate-500 max-w-sm mb-8">Ask any question about the Indian election process, voter registration, or your rights.</p>
              
              <div className="flex flex-wrap justify-center gap-2 max-w-lg">
                {suggestions.map(s => (
                  <button 
                    key={s}
                    onClick={() => handleSend(s)}
                    className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full text-sm text-slate-700 dark:text-slate-300 transition"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Bot size={18} />
                  </div>
                )}
                
                <div className={`px-4 py-3 rounded-2xl max-w-[85%] md:max-w-[75%] ${
                  msg.role === 'user' 
                    ? 'bg-[#1B2F5E] text-white rounded-tr-sm' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-sm'
                }`}>
                  <div className="whitespace-pre-wrap leading-relaxed">{msg.content}</div>
                </div>

                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-[#FF6B00] text-white flex items-center justify-center shrink-0">
                    <User size={18} />
                  </div>
                )}
              </motion.div>
            ))
          )}
          
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <Bot size={18} />
              </div>
              <div className="px-4 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800 rounded-tl-sm flex gap-1 items-center">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50">
          <div className="flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend(input))}
              placeholder="Type your question..."
              className="flex-1 px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1B2F5E]"
            />
            <button 
              onClick={() => handleSend(input)}
              disabled={loading || !input.trim()}
              className="bg-[#1B2F5E] text-white p-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
            >
              <Send size={20} />
            </button>
          </div>
          <div className="text-xs text-slate-400 mt-2 text-right">{input.length} characters</div>
        </div>
      </div>
    </motion.div>
  );
}
