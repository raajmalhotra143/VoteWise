import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function Auth() {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [state, setState] = useState('');

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", 
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Delhi", "Jammu and Kashmir", "Puducherry"
  ];

  const handleGoogle = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
      toast.success('Successfully logged in');
      navigate('/chat');
    } catch (err: any) {
      toast.error(err.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (isSignUp) {
        await signUpWithEmail(email, password, name, state);
        toast.success('Account created successfully');
      } else {
        await signInWithEmail(email, password);
        toast.success('Successfully logged in');
      }
      navigate('/chat');
    } catch (err: any) {
      toast.error(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-md mx-auto mt-12 glass-card p-8"
    >
      <h2 className="text-2xl font-headline font-bold text-center mb-6 text-[#1B2F5E] dark:text-white">
        {isSignUp ? 'Create an Account' : 'Welcome Back'}
      </h2>

      <button 
        onClick={handleGoogle} 
        disabled={loading}
        className="w-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 rounded-lg py-3 px-4 flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
      >
        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
        Continue with Google
      </button>

      <div className="flex items-center my-6">
        <div className="flex-1 border-t border-slate-300 dark:border-slate-600"></div>
        <span className="px-4 text-sm text-slate-500">or continue with email</span>
        <div className="flex-1 border-t border-slate-300 dark:border-slate-600"></div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {isSignUp && (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input 
                type="text" 
                required 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1B2F5E]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">State</label>
              <select 
                required 
                value={state} 
                onChange={(e) => setState(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1B2F5E]"
              >
                <option value="">Select your state</option>
                {states.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </>
        )}
        
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input 
            type="email" 
            required 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1B2F5E]"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input 
            type="password" 
            required 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1B2F5E]"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="btn-primary mt-2 flex justify-center items-center h-12"
        >
          {loading ? <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span> : (isSignUp ? 'Sign Up' : 'Sign In')}
        </button>
      </form>

      <p className="text-center mt-6 text-sm text-slate-600 dark:text-slate-400">
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}
        <button 
          onClick={() => setIsSignUp(!isSignUp)} 
          className="ml-2 font-medium text-[#1B2F5E] dark:text-[#FF6B00] hover:underline"
        >
          {isSignUp ? 'Sign In' : 'Sign Up'}
        </button>
      </p>
    </motion.div>
  );
}
