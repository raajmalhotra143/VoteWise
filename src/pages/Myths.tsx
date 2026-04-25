import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XCircle, CheckCircle2, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { SpeechButton } from '../components/SpeechButton';

const MYTHS = [
  {
    id: "m1",
    myth: "EVMs can be hacked and votes can be changed",
    truth: "EVMs (Electronic Voting Machines) are standalone, non-networked devices. They do not have internet, Bluetooth, or wireless connectivity, making remote hacking impossible. The VVPAT provides a physical paper trail verifiable by the voter."
  },
  {
    id: "m2",
    myth: "If you press NOTA and it wins, the election is cancelled",
    truth: "Currently, NOTA (None of the Above) does not have the power to void an election. Even if NOTA gets the highest number of votes, the candidate with the second-highest votes (the highest among actual candidates) is declared the winner."
  },
  {
    id: "m3",
    myth: "You can vote multiple times in the same election",
    truth: "Voting multiple times is a criminal offense under the Representation of the People Act. The indelible ink applied to the voter's finger and rigorous verification of the electoral roll prevent multiple voting."
  },
  {
    id: "m4",
    myth: "Voter ID (EPIC) is the only valid ID to vote",
    truth: "While EPIC is preferred, ECI allows several other approved documents for identity verification if your name is on the electoral roll, such as Aadhaar Card, PAN Card, Passport, Driving License, or Bank Passbook with photo."
  },
  {
    id: "m5",
    myth: "NRIs can vote from abroad online",
    truth: "No, online voting is not permitted. Non-Resident Indians (NRIs) can register to vote but they must be physically present at their registered constituency in India on polling day to cast their vote."
  },
  {
    id: "m6",
    myth: "Your vote is not secret — the government can see who you voted for",
    truth: "The voting process in India guarantees absolute secrecy. Neither the government nor election officials can trace which button a specific voter pressed on the EVM."
  },
  {
    id: "m7",
    myth: "If you do not vote, your bank account can be frozen",
    truth: "There is no law in India that penalizes citizens for not voting by freezing bank accounts or cutting off services. Voting is a right, not a legally punishable duty, though civic participation is encouraged."
  },
  {
    id: "m8",
    myth: "First time voters don't need to register if they turn 18 by voting day",
    truth: "Turning 18 does not automatically make you a voter. You must proactively submit Form 6 to register your name on the electoral roll before the stipulated deadline before the election."
  }
];

export default function Myths() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [customMyth, setCustomMyth] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleFeedback = async (mythId: string, helpful: boolean) => {
    toast.success('Thank you for your feedback!');
    try {
      await supabase.from('myth_feedback').insert([{
        user_id: user?.uid || null,
        myth_id: mythId,
        was_helpful: helpful
      }]);
    } catch (e) {
      console.error('Feedback error', e);
    }
  };

  const submitCustomMyth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMyth.trim()) return;
    navigate('/chat', { state: { initialQuery: `Is this an election myth? "${customMyth}"` } });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-10">
        <h1 className="text-4xl font-headline font-bold text-[#1B2F5E] dark:text-white mb-4">Election Myths — Busted by AI</h1>
        <p className="text-slate-600 dark:text-slate-400">Separate facts from fiction. Learn the truth about Indian elections.</p>
      </div>

      <div className="grid gap-6">
        {MYTHS.map((item) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card overflow-hidden"
          >
            <div 
              className="p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
              onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 mt-1">
                  <XCircle className="text-rose-500" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase text-rose-500 tracking-wider mb-1">Myth</div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">{item.myth}</h3>
                    <SpeechButton text={`Myth: ${item.myth}. The truth is: ${item.truth}`} />
                  </div>
                </div>
              </div>
              <div className="shrink-0 self-end md:self-auto text-slate-400">
                {expandedId === item.id ? <ChevronUp /> : <ChevronDown />}
              </div>
            </div>

            <AnimatePresence>
              {expandedId === item.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-green-50/50 dark:bg-green-900/10 border-t border-slate-200 dark:border-slate-700/50"
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 mt-1">
                        <CheckCircle2 className="text-[#1A6B3A]" />
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase text-[#1A6B3A] tracking-wider mb-1">The Truth</div>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{item.truth}</p>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-200 dark:border-slate-700/50 pt-4">
                      <span className="text-sm text-slate-500">Was this helpful?</span>
                      <button onClick={() => handleFeedback(item.id, true)} className="p-2 bg-slate-100 hover:bg-green-100 dark:bg-slate-800 dark:hover:bg-green-900/50 rounded-full transition">👍</button>
                      <button onClick={() => handleFeedback(item.id, false)} className="p-2 bg-slate-100 hover:bg-rose-100 dark:bg-slate-800 dark:hover:bg-rose-900/50 rounded-full transition">👎</button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 glass-card p-8 text-center bg-[#1B2F5E] text-white border-none">
        <h3 className="text-2xl font-headline font-bold mb-3">Have another myth in mind?</h3>
        <p className="text-slate-300 mb-6 max-w-lg mx-auto">Ask our AI assistant to fact-check any election rumors or forwarded messages.</p>
        <form onSubmit={submitCustomMyth} className="max-w-lg mx-auto relative">
          <input 
            type="text" 
            value={customMyth}
            onChange={e => setCustomMyth(e.target.value)}
            placeholder="Type a rumor or myth here..."
            className="w-full pl-6 pr-14 py-4 rounded-full bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-white placeholder:text-white/50"
          />
          <button type="submit" className="absolute right-2 top-2 bottom-2 bg-[#FF6B00] text-white p-2 rounded-full hover:opacity-90 transition">
            <Search size={20} />
          </button>
        </form>
      </div>
    </motion.div>
  );
}
