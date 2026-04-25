import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Howl } from 'howler';
import { Info, CheckCircle2, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';

const CANDIDATES = [
  { id: 1, name: "Representative Alpha", symbol: "☀️" },
  { id: 2, name: "Representative Beta", symbol: "🌙" },
  { id: 3, name: "Representative Gamma", symbol: "⭐" },
  { id: 4, name: "Representative Delta", symbol: "🌍" },
  { id: 5, name: "Representative Epsilon", symbol: "🔥" },
  { id: 6, name: "NOTA", symbol: "❌" }
];

export default function MockEVM() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isVoted, setIsVoted] = useState(false);
  const [showSlip, setShowSlip] = useState(false);
  const [vvpatCandidate, setVvpatCandidate] = useState<typeof CANDIDATES[0] | null>(null);

  // Simulated EVM Beep
  const beep = new Howl({
    src: ['https://www.soundjay.com/buttons/beep-01a.mp3'],
    volume: 0.5
  });

  const handleVote = (candidate: typeof CANDIDATES[0]) => {
    if (isVoted) return;
    
    setSelectedId(candidate.id);
    setVvpatCandidate(candidate);
    setIsVoted(true);
    beep.play();
    toast.success('Vote Cast Successfully!');

    // VVPAT Process
    setTimeout(() => {
      setShowSlip(true);
      setTimeout(() => {
        setShowSlip(false);
      }, 7000); // Slip visible for 7 seconds as per ECI rules
    }, 500);
  };

  const reset = () => {
    setIsVoted(false);
    setSelectedId(null);
    setShowSlip(false);
    setVvpatCandidate(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-5xl mx-auto"
    >
      <div className="text-center mb-8">
        <h1 className="text-4xl font-headline font-bold text-[#1B2F5E] dark:text-white mb-2">Mock EVM Experience</h1>
        <p className="text-slate-600 dark:text-slate-400">Practice casting your vote in a safe, simulated environment.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* EVM Control Unit / Instructions */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card p-6 border-l-4 border-[#1B2F5E]">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
              <Info className="text-[#1B2F5E]" />
              How it works
            </h3>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li>1. Review the list of candidates and symbols.</li>
              <li>2. Press the <b>Blue Button</b> next to your choice.</li>
              <li>3. Listen for the long <b>Beep</b> sound.</li>
              <li>4. Verify your choice on the <b>VVPAT window</b> (right).</li>
              <li>5. The slip stays visible for <b>7 seconds</b>.</li>
            </ul>
          </div>

          <div className="glass-card p-6 text-center">
            <h4 className="text-sm font-bold text-slate-500 uppercase mb-4 tracking-widest">EVM Status</h4>
            <div className={`inline-block px-4 py-2 rounded-full font-bold text-sm ${isVoted ? 'bg-rose-100 text-rose-600' : 'bg-green-100 text-green-600 animate-pulse'}`}>
              {isVoted ? 'READY LAMP OFF' : 'READY TO VOTE'}
            </div>
            {isVoted && (
              <button 
                onClick={reset}
                className="mt-6 flex items-center gap-2 mx-auto text-[#1B2F5E] font-bold hover:underline"
              >
                <RotateCcw size={18} /> Reset Machine
              </button>
            )}
          </div>
        </div>

        {/* EVM Balloting Unit */}
        <div className="lg:col-span-1 glass-card p-4 bg-slate-200 dark:bg-slate-800 border-8 border-slate-300 dark:border-slate-700 shadow-2xl relative">
          <div className="bg-white dark:bg-slate-900 rounded p-2 mb-4 text-center border-b-2 border-slate-300">
            <span className="text-xs font-bold text-slate-400">BALLOTING UNIT</span>
          </div>
          
          <div className="space-y-2">
            {CANDIDATES.map((c) => (
              <div key={c.id} className="flex items-center gap-2 bg-white dark:bg-slate-900 p-3 rounded border border-slate-300 shadow-sm">
                <div className="w-8 font-bold text-slate-400">{c.id}</div>
                <div className="flex-1 flex items-center gap-3 font-medium">
                  <span className="text-2xl">{c.symbol}</span>
                  <span className="text-sm truncate">{c.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${selectedId === c.id ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.8)]' : 'bg-slate-200 dark:bg-slate-800'}`}></div>
                  <button 
                    onClick={() => handleVote(c)}
                    disabled={isVoted}
                    className={`w-12 h-8 rounded bg-blue-600 hover:bg-blue-700 active:bg-blue-900 transition-colors shadow-md disabled:bg-slate-400`}
                    aria-label={`Vote for ${c.name}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* VVPAT Unit */}
        <div className="lg:col-span-1">
          <div className="glass-card h-full p-6 bg-slate-800 border-8 border-slate-700 shadow-2xl flex flex-col items-center">
            <div className="text-slate-400 text-xs font-bold mb-4 tracking-widest uppercase">VVPAT PRINTER</div>
            
            <div className="w-full aspect-[3/4] bg-slate-950 rounded-lg border-4 border-slate-900 overflow-hidden relative flex items-center justify-center">
              {/* VVPAT Window */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)] z-10 pointer-events-none"></div>
              
              <AnimatePresence>
                {showSlip && vvpatCandidate && (
                  <motion.div 
                    initial={{ y: -300, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 300, opacity: 0 }}
                    transition={{ type: "spring", damping: 20 }}
                    className="w-[80%] bg-white p-6 shadow-2xl text-black flex flex-col items-center gap-4 rounded-sm"
                  >
                    <div className="text-[10px] font-bold border-b border-black w-full text-center pb-1">VOTER VERIFIABLE PAPER AUDIT TRAIL</div>
                    <div className="text-4xl">{vvpatCandidate.symbol}</div>
                    <div className="text-lg font-bold text-center">{vvpatCandidate.name}</div>
                    <div className="text-xs font-mono">Candidate ID: {vvpatCandidate.id}</div>
                    <div className="text-[8px] mt-4 opacity-50">ECI - ELECTION 2026</div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!showSlip && !isVoted && (
                <div className="text-slate-700 text-center text-sm p-8 italic">
                  Window will show your slip here after you vote.
                </div>
              )}
            </div>

            {isVoted && !showSlip && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 text-green-400 flex items-center gap-2 font-bold">
                <CheckCircle2 size={20} /> Slip Collected Successfully
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
