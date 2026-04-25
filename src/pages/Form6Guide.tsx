import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardCheck, FileText, UserCircle, MapPin, CheckCircle } from 'lucide-react';

const STEPS = [
  { 
    id: 1, 
    title: "Basic Eligibility", 
    icon: <UserCircle />,
    content: "Are you an Indian citizen and 18+ years of age? If yes, you are eligible to register using Form 6."
  },
  { 
    id: 2, 
    title: "Required Documents", 
    icon: <FileText />,
    content: "Keep these ready: 1. Passport size photo, 2. Age proof (Aadhaar/PAN/10th Marksheet), 3. Address proof (Electricity bill/Passport/Bank passbook)."
  },
  { 
    id: 3, 
    title: "Constituency Details", 
    icon: <MapPin />,
    content: "Identify your Assembly Constituency. You can find this on your family members' Voter IDs or by using your address on the ECI portal."
  },
  { 
    id: 4, 
    title: "Final Submission", 
    icon: <ClipboardCheck />,
    content: "Go to voters.eci.gov.in, login, and fill Form 6. Upload your documents and submit. Note your Reference ID for tracking."
  }
];

export default function Form6Guide() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-10">
        <h1 className="text-4xl font-headline font-bold text-[#1B2F5E] dark:text-white mb-4">Voter Registration Assistant</h1>
        <p className="text-slate-600 dark:text-slate-400">Your step-by-step guide to filling Form 6 correctly.</p>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-12">
        {STEPS.map((step, i) => (
          <div 
            key={step.id}
            className={`flex flex-col items-center text-center p-4 rounded-xl transition-all ${
              i <= currentStep ? 'bg-[#1B2F5E] text-white shadow-lg' : 'bg-white dark:bg-slate-800 text-slate-400'
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
              i < currentStep ? 'bg-[#1A6B3A]' : (i === currentStep ? 'bg-[#FF6B00]' : 'bg-slate-200 dark:bg-slate-700')
            }`}>
              {i < currentStep ? <CheckCircle size={20} /> : step.id}
            </div>
            <span className="text-xs font-bold uppercase tracking-wider">{step.title}</span>
          </div>
        ))}
      </div>

      <div className="glass-card p-8 min-h-[300px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col items-center text-center py-6"
          >
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 text-[#1B2F5E] dark:text-[#FF6B00] rounded-full flex items-center justify-center mb-6">
              {STEPS[currentStep].icon}
            </div>
            <h2 className="text-2xl font-bold mb-4">{STEPS[currentStep].title}</h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed">
              {STEPS[currentStep].content}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between items-center mt-8 border-t border-slate-100 dark:border-slate-800 pt-6">
          <button 
            disabled={currentStep === 0}
            onClick={() => setCurrentStep(prev => prev - 1)}
            className="px-6 py-2 rounded-lg font-medium text-slate-500 disabled:opacity-0 transition hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Previous
          </button>
          
          <button 
            onClick={() => currentStep === STEPS.length - 1 ? window.open('https://voters.eci.gov.in', '_blank') : setCurrentStep(prev => prev + 1)}
            className="btn-accent px-8"
          >
            {currentStep === STEPS.length - 1 ? 'Go to ECI Portal' : 'Next Step'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
