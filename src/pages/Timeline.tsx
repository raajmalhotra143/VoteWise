import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, CheckCircle, FileText, Scale, Users, Info, Vote, Award, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { SpeechButton } from '../components/SpeechButton';

const STAGES = [
  {
    id: 1,
    title: "Election Notification",
    icon: <Info size={24} className="text-blue-500" />,
    shortDesc: "ECI issues official notification, dates announced",
    details: [
      "The Election Commission of India (ECI) announces the election schedule.",
      "This formal notification starts the election process.",
      "The Model Code of Conduct (MCC) comes into effect immediately."
    ]
  },
  {
    id: 2,
    title: "Voter Registration Verification",
    icon: <Users size={24} className="text-green-500" />,
    shortDesc: "Check your name on voter list using eci.gov.in or 1950 helpline",
    details: [
      "Citizens must verify their names on the electoral rolls.",
      "New voters can register using Form 6.",
      "You cannot vote if your name is not on the final voter list."
    ]
  },
  {
    id: 3,
    title: "Filing of Nominations",
    icon: <FileText size={24} className="text-orange-500" />,
    shortDesc: "Candidates submit nomination papers to Returning Officer",
    details: [
      "Candidates file their nomination papers.",
      "A security deposit is required (Rs 25,000 for Lok Sabha).",
      "Candidates must declare criminal records, assets, and liabilities."
    ]
  },
  {
    id: 4,
    title: "Scrutiny of Nominations",
    icon: <CheckCircle size={24} className="text-teal-500" />,
    shortDesc: "Returning Officer checks validity of nominations",
    details: [
      "The Returning Officer examines all nomination papers.",
      "Invalid papers are rejected.",
      "Candidates can withdraw their nominations within a specified time."
    ]
  },
  {
    id: 5,
    title: "Model Code of Conduct",
    icon: <Scale size={24} className="text-purple-500" />,
    shortDesc: "Political parties and candidates must follow ECI rules",
    details: [
      "A set of guidelines to ensure free and fair elections.",
      "Government cannot announce new schemes or projects.",
      "Use of official machinery for campaigning is prohibited."
    ]
  },
  {
    id: 6,
    title: "Election Campaigning",
    icon: <BookOpen size={24} className="text-yellow-500" />,
    shortDesc: "Parties campaign, campaigning stops 48 hours before voting",
    details: [
      "Parties release manifestos and hold rallies.",
      "Campaigning must stop 48 hours before the start of polling.",
      "This 48-hour period is known as the 'silence period'."
    ]
  },
  {
    id: 7,
    title: "Voting Day",
    icon: <Vote size={24} className="text-red-500" />,
    shortDesc: "Voters cast vote using EVM, VVPAT slip shown for verification",
    details: [
      "Voters go to their designated polling stations.",
      "Indelible ink is applied to the left index finger.",
      "Votes are cast on Electronic Voting Machines (EVMs).",
      "VVPAT provides a paper trail for verification."
    ]
  },
  {
    id: 8,
    title: "Vote Counting & Results",
    icon: <Award size={24} className="text-indigo-500" />,
    shortDesc: "EVMs opened, votes counted, winner declared",
    details: [
      "EVMs are opened in the presence of candidate representatives.",
      "Votes are counted under tight security.",
      "The Returning Officer declares the winner (First-Past-The-Post system)."
    ]
  }
];

export default function Timeline() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [filter, setFilter] = useState<'lok_sabha' | 'vidhan_sabha'>('lok_sabha');
  const navigate = useNavigate();

  const handleAskAI = (stageTitle: string) => {
    navigate('/chat', { state: { initialQuery: `Can you explain the "${stageTitle}" step in the Indian election process in more detail?` } });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-10">
        <h1 className="text-4xl font-headline font-bold text-[#1B2F5E] dark:text-white mb-4">India's Election Process — Step by Step</h1>
        <p className="text-slate-600 dark:text-slate-400">Understand the journey from notification to results.</p>
        
        <div className="mt-6 flex justify-center gap-4">
          <button 
            onClick={() => setFilter('lok_sabha')}
            className={`px-4 py-2 rounded-full font-medium transition ${filter === 'lok_sabha' ? 'bg-[#1B2F5E] text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}
          >
            General Election (Lok Sabha)
          </button>
          <button 
            onClick={() => setFilter('vidhan_sabha')}
            className={`px-4 py-2 rounded-full font-medium transition ${filter === 'vidhan_sabha' ? 'bg-[#1B2F5E] text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}
          >
            State Election (Vidhan Sabha)
          </button>
        </div>
      </div>

      <div className="relative pl-4 md:pl-8">
        <div className="absolute left-6 md:left-10 top-4 bottom-4 w-1 bg-slate-200 dark:bg-slate-800 rounded-full"></div>

        {STAGES.map((stage) => (
          <motion.div 
            key={stage.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="relative mb-8 pl-8 md:pl-12"
          >
            <div className="absolute left-[-16px] md:left-[-8px] top-4 w-10 h-10 rounded-full bg-white dark:bg-slate-900 border-4 border-[#1B2F5E] flex items-center justify-center font-bold text-[#1B2F5E] dark:text-white shadow-md z-10">
              {stage.id}
            </div>

            <div className="glass-card overflow-hidden">
              <div 
                className="p-6 cursor-pointer flex items-center justify-between"
                onClick={() => setExpandedId(expandedId === stage.id ? null : stage.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="hidden sm:block p-3 rounded-full bg-slate-100 dark:bg-slate-800">
                    {stage.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-headline font-semibold text-[#1B2F5E] dark:text-white">{stage.title}</h3>
                      <SpeechButton text={`${stage.title}. ${stage.shortDesc}`} />
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">{stage.shortDesc}</p>
                  </div>
                </div>
                <div className="shrink-0 text-slate-400">
                  {expandedId === stage.id ? <ChevronUp /> : <ChevronDown />}
                </div>
              </div>

              <AnimatePresence>
                {expandedId === stage.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-slate-200 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/30"
                  >
                    <div className="p-6">
                      <ul className="list-disc pl-5 space-y-2 mb-6 text-slate-700 dark:text-slate-300">
                        {stage.details.map((detail, i) => (
                          <li key={i}>{detail}</li>
                        ))}
                      </ul>
                      
                      <button 
                        onClick={() => handleAskAI(stage.title)}
                        className="btn-accent py-2 px-4 text-sm flex items-center gap-2"
                      >
                        Ask AI about this step
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <button className="px-6 py-3 border border-[#1B2F5E] text-[#1B2F5E] dark:border-white dark:text-white rounded-lg font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition">
          Download as PDF
        </button>
      </div>
    </motion.div>
  );
}
