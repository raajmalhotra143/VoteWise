import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, RotateCcw, Home } from 'lucide-react';
import { saveQuizAttempt } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

const QUIZZES = {
  voter_basics: {
    title: "Voter Basics",
    desc: "10 questions, Beginner. Covers registration and eligibility.",
    time: "5 min",
    difficulty: "Beginner",
    questions: [
      { q: "What is the minimum age to vote in India?", options: ["16 years", "18 years", "21 years", "25 years"], a: 1, exp: "The Constitution of India sets the minimum voting age at 18 years." },
      { q: "What document is used as the primary voter identity in India?", options: ["Aadhar Card", "PAN Card", "EPIC (Voter ID Card)", "Passport"], a: 2, exp: "EPIC stands for Electors Photo Identity Card, issued by ECI." },
      { q: "Which form is filled to register as a new voter?", options: ["Form 6", "Form 7", "Form 8", "Form 9"], a: 0, exp: "Form 6 is used to enroll as a new voter or to add your name to the electoral roll." },
      { q: "Where can you check your name on the voter list?", options: ["eci.gov.in", "india.gov.in", "aadhar.gov.in", "rbi.gov.in"], a: 0, exp: "The official ECI website eci.gov.in lets you search your voter registration status." },
      { q: "What is the Voter Helpline number in India?", options: ["100", "1090", "1950", "1800"], a: 2, exp: "1950 is the national Voter Helpline number managed by ECI." },
      { q: "Can a Non-Resident Indian (NRI) vote in Indian elections?", options: ["No, NRIs cannot vote", "Yes, they can vote from abroad", "Yes, but only in person at their registered constituency", "Only in Presidential elections"], a: 2, exp: "NRIs can vote but must be physically present in India at their registered constituency on voting day." },
      { q: "How many times can a voter vote in a single election?", options: ["As many times as they wish", "Twice", "Once", "Depends on their state"], a: 2, exp: "Each registered voter can cast their vote only once per election." },
      { q: "What is the NVSP portal used for?", options: ["Checking election results", "National Voter Service Portal for voter registration services", "Paying election taxes", "Filing nomination papers"], a: 1, exp: "NVSP (National Voters Service Portal) at nvsp.in is the one-stop portal for all voter registration services." },
      { q: "Which authority maintains the electoral rolls in India?", options: ["State Government", "Prime Minister's Office", "Election Commission of India", "Supreme Court"], a: 2, exp: "The Election Commission of India (ECI) is the constitutional authority responsible for maintaining electoral rolls." },
      { q: "What happens if your name is not on the electoral roll on voting day?", options: ["You can vote with Aadhar card", "You cannot vote", "You can vote with a court order", "You can add your name on the spot"], a: 1, exp: "If your name is not on the electoral roll, you cannot vote. Registration must be done before the deadline." }
    ]
  },
  election_process: {
    title: "Election Process",
    desc: "10 questions, Intermediate. Covers EVM, counting, timeline.",
    time: "5 min",
    difficulty: "Intermediate",
    questions: [
      { q: "What does EVM stand for?", options: ["Electronic Voting Module", "Electronic Voting Machine", "Electoral Vote Manager", "Electronic Vote Monitor"], a: 1, exp: "EVM stands for Electronic Voting Machine, used in Indian elections since 2004 nationwide." },
      { q: "What is VVPAT?", options: ["Voter Verified Paper Audit Trail", "Virtual Voter Paper Audit Technology", "Verified Voting Paper Audit Test", "Voter Verified Public Audit Trail"], a: 0, exp: "VVPAT shows a paper slip to the voter confirming their vote after pressing the EVM button." },
      { q: "How many hours before voting day does campaigning officially stop?", options: ["12 hours", "24 hours", "48 hours", "72 hours"], a: 2, exp: "Under the Model Code of Conduct, all campaigning must stop 48 hours before the voting date." },
      { q: "What is the Model Code of Conduct?", options: ["A law passed by Parliament", "A set of guidelines issued by ECI for parties and candidates during elections", "Rules for journalists covering elections", "Code of conduct for EVM manufacturers"], a: 1, exp: "The Model Code of Conduct (MCC) is a set of guidelines issued by ECI that political parties and candidates must follow during election time." },
      { q: "Who is the Returning Officer?", options: ["The winner of the election", "An official appointed by ECI to oversee elections in a constituency", "The Chief Election Commissioner", "The District Collector who counts votes"], a: 1, exp: "The Returning Officer is the government official responsible for conducting elections in a particular constituency." },
      { q: "What percentage of votes can trigger an election recount request?", options: ["Any margin", "Less than 1%", "Less than 5%", "The rules vary by state"], a: 0, exp: "A candidate can request a recount regardless of the margin, subject to payment of a prescribed fee." },
      { q: "What color ink is used to mark the voter's finger after voting?", options: ["Black", "Blue", "Indelible violet/purple", "Red"], a: 2, exp: "Indelible ink (a violet/purple-colored ink that cannot be easily removed) is applied to the left index finger." },
      { q: "What is the minimum number of voters required to form a polling station?", options: ["100", "500", "1000", "1500"], a: 3, exp: "As per ECI guidelines, a polling station typically serves a maximum of 1500 electors." },
      { q: "Can independent candidates contest in Lok Sabha elections?", options: ["No", "Yes, without any restrictions", "Yes, but only if they were previously in a political party", "Yes, but they need a certain number of proposers"], a: 3, exp: "Yes, independent candidates can contest but must submit a nomination with the required number of proposers from the constituency." },
      { q: "How is the winning candidate determined in a constituency election in India?", options: ["Proportional representation", "First-Past-The-Post system", "Ranked choice voting", "Two-round system"], a: 1, exp: "India uses the First-Past-The-Post (FPTP) system — the candidate with the most votes wins, even without a majority." }
    ]
  },
  voting_rights: {
    title: "Your Voting Rights",
    desc: "10 questions, Advanced. Covers rights, legal aspects, NOTA.",
    time: "5 min",
    difficulty: "Advanced",
    questions: [
      { q: "What is NOTA?", options: ["Name Of The Applicant", "None Of The Above", "National Online Tallying Application", "No Official Ticket Available"], a: 1, exp: "NOTA (None Of The Above) was introduced in 2013 by the Supreme Court order, allowing voters to reject all candidates." },
      { q: "Does pressing NOTA affect the election result if it gets the most votes?", options: ["Yes, a re-election is held", "No, the candidate with the next highest votes still wins", "Yes, all candidates are disqualified", "The constituency remains unrepresented"], a: 1, exp: "Currently, even if NOTA gets the most votes, the candidate with the highest votes among contestants wins. NOTA has no power to void an election." },
      { q: "Is voting in India compulsory?", options: ["Yes, it is compulsory by law everywhere", "No, it is a right, not a duty", "Yes in some states like Gujarat", "Only for government employees"], a: 2, exp: "Voting is not compulsory in most of India, but Gujarat and a few other states have local laws encouraging compulsory voting in local body elections." },
      { q: "Under what Article of the Constitution is the Election Commission of India established?", options: ["Article 72", "Article 324", "Article 356", "Article 226"], a: 1, exp: "Article 324 of the Indian Constitution establishes the Election Commission of India and grants it superintendence of elections." },
      { q: "What is the Right to Vote in India classified as?", options: ["Fundamental Right", "Constitutional Right", "Statutory Right under Representation of People Act", "Natural Right"], a: 2, exp: "The right to vote in India is a statutory right under the Representation of the People Act, 1951 — not a Fundamental Right under Part III of the Constitution." },
      { q: "Can a person in judicial custody vote?", options: ["Yes", "No", "Only if released on bail", "Only in state elections"], a: 2, exp: "A person in judicial custody (under-trial) can vote only if released on bail on voting day and their name is on the voter list." },
      { q: "What is the 'silent period' during elections?", options: ["When candidates are not allowed to speak publicly", "48 hours before polling when no campaigning is allowed", "The period between announcement and nomination filing", "The counting period"], a: 1, exp: "The 48 hours before voting begins is called the 'silence period' or 'silence zone' when all campaign activities must stop." },
      { q: "Who appoints the Chief Election Commissioner of India?", options: ["The Prime Minister", "The President of India", "The Parliament", "The Supreme Court"], a: 1, exp: "The Chief Election Commissioner (CEC) is appointed by the President of India on the advice of a selection committee." },
      { q: "What is the security deposit amount for a general category Lok Sabha candidate?", options: ["Rs 10,000", "Rs 25,000", "Rs 50,000", "Rs 1,00,000"], a: 1, exp: "The security deposit for Lok Sabha candidates is Rs 25,000 for general category and Rs 12,500 for SC/ST candidates." },
      { q: "When was the voting age in India reduced from 21 to 18 years?", options: ["1947", "1952", "1989", "2000"], a: 2, exp: "The 61st Constitutional Amendment Act of 1988 (in effect from 1989) reduced the voting age from 21 to 18 years." }
    ]
  }
};

export default function Quiz() {
  const { user } = useAuth();
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [startTime, setStartTime] = useState(0);

  const startQuiz = (id: string) => {
    setActiveQuiz(id);
    setCurrentIdx(0);
    setScore(0);
    setShowResult(false);
    setShowExplanation(false);
    setSelectedOption(null);
    setStartTime(Date.now());
  };

  const handleSelect = (idx: number) => {
    if (showExplanation) return;
    setSelectedOption(idx);
    setShowExplanation(true);
    
    if (idx === QUIZZES[activeQuiz as keyof typeof QUIZZES].questions[currentIdx].a) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < QUIZZES[activeQuiz as keyof typeof QUIZZES].questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setShowExplanation(false);
      setSelectedOption(null);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    setShowResult(true);
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    if (user && activeQuiz) {
      const qz = QUIZZES[activeQuiz as keyof typeof QUIZZES];
      await saveQuizAttempt(user.uid, activeQuiz, score + (selectedOption === qz.questions[currentIdx].a ? 1 : 0), qz.questions.length, timeTaken);
    }
  };

  if (showResult && activeQuiz) {
    const total = QUIZZES[activeQuiz as keyof typeof QUIZZES].questions.length;
    const finalScore = score; // Already updated in handleSelect immediately
    const pct = (finalScore / total) * 100;
    
    let msg = "Excellent! You're a VoteWise champion!";
    if (pct <= 40) msg = "Keep learning! Start with our Election Timeline";
    else if (pct <= 70) msg = "Good effort! You know the basics. Explore more in our AI Chat";

    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto glass-card p-8 text-center mt-10">
        <h2 className="text-3xl font-headline font-bold text-[#1B2F5E] dark:text-white mb-6">Quiz Completed!</h2>
        
        <div className="w-32 h-32 rounded-full border-8 border-[#1A6B3A] mx-auto flex items-center justify-center text-4xl font-bold text-[#1A6B3A] mb-6">
          {finalScore}/{total}
        </div>
        
        <p className="text-xl font-medium mb-2">{pct}% Score</p>
        <p className="text-slate-600 dark:text-slate-400 mb-8">{msg}</p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button onClick={() => startQuiz(activeQuiz)} className="btn-primary flex items-center justify-center gap-2">
            <RotateCcw size={18} /> Retry Quiz
          </button>
          <button onClick={() => setActiveQuiz(null)} className="px-6 py-3 bg-slate-200 dark:bg-slate-800 rounded-lg font-medium hover:bg-slate-300 dark:hover:bg-slate-700 transition flex items-center justify-center gap-2">
            <Home size={18} /> Try Another
          </button>
        </div>
      </motion.div>
    );
  }

  if (activeQuiz) {
    const qz = QUIZZES[activeQuiz as keyof typeof QUIZZES];
    const q = qz.questions[currentIdx];

    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto mt-10">
        <div className="mb-8">
          <div className="flex justify-between text-sm font-medium text-slate-500 mb-2">
            <span>Question {currentIdx + 1} of {qz.questions.length}</span>
            <span>{qz.title}</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-[#FF6B00] h-full transition-all duration-300" style={{ width: `${((currentIdx + 1) / qz.questions.length) * 100}%` }}></div>
          </div>
        </div>

        <div className="glass-card p-8">
          <h2 className="text-2xl font-headline font-semibold text-[#1B2F5E] dark:text-white mb-8">{q.q}</h2>
          
          <div className="grid gap-4">
            {q.options.map((opt, i) => {
              let bgClass = "bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300";
              
              if (showExplanation) {
                if (i === q.a) bgClass = "bg-green-100 dark:bg-green-900/30 border-green-500 text-green-800 dark:text-green-300";
                else if (i === selectedOption) bgClass = "bg-rose-100 dark:bg-rose-900/30 border-rose-500 text-rose-800 dark:text-rose-300";
                else bgClass = "bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-400 opacity-60";
              }

              return (
                <motion.button
                  key={i}
                  whileHover={!showExplanation ? { scale: 1.01 } : {}}
                  whileTap={!showExplanation ? { scale: 0.99 } : {}}
                  onClick={() => handleSelect(i)}
                  disabled={showExplanation}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${bgClass}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center font-bold text-sm shrink-0">
                      {['A', 'B', 'C', 'D'][i]}
                    </div>
                    <span className="font-medium text-lg">{opt}</span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {showExplanation && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-8 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-900/50 text-blue-800 dark:text-blue-300">
              <p className="font-medium">Explanation:</p>
              <p className="text-sm mt-1">{q.exp}</p>
            </motion.div>
          )}

          {showExplanation && (
            <div className="mt-8 flex justify-end">
              <button onClick={handleNext} className="btn-primary flex items-center gap-2">
                {currentIdx < qz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'} <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-headline font-bold text-[#1B2F5E] dark:text-white mb-4">Election Knowledge Quiz</h1>
        <p className="text-slate-600 dark:text-slate-400">Test your understanding of India's democratic process.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {Object.entries(QUIZZES).map(([id, q]) => (
          <div key={id} className="glass-card p-6 flex flex-col h-full">
            <div className="mb-4">
              <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                q.difficulty === 'Beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/30' :
                q.difficulty === 'Intermediate' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30' :
                'bg-rose-100 text-rose-700 dark:bg-rose-900/30'
              }`}>
                {q.difficulty}
              </span>
            </div>
            <h3 className="text-2xl font-headline font-semibold text-[#1B2F5E] dark:text-white mb-2">{q.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 flex-grow">{q.desc}</p>
            
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
              <Clock size={16} /> <span>{q.time} estimated</span>
            </div>
            
            <button onClick={() => startQuiz(id)} className="w-full py-3 bg-[#1B2F5E] text-white rounded-lg font-medium hover:opacity-90 transition">
              Start Quiz
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
