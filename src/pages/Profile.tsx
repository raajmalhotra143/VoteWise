import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getUserStats, supabase } from '../lib/supabase';
import { User, LogOut, Moon, Sun, Award, Shield, Star, Medal, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon_type: string;
}

export default function Profile() {
  const { user, signOut } = useAuth();
  const [stats, setStats] = useState({ count: 0, average: 0, best: 0 });
  const [profile, setProfile] = useState<any>(null);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [isDark, setIsDark] = useState(document.body.classList.contains('dark'));

  useEffect(() => {
    if (user) {
      getUserStats(user.uid).then(setStats).catch(console.error);
      
      // Fetch profile details
      supabase.from('users_profile').select('*').eq('id', user.uid).single().then(({ data }) => setProfile(data));
      
      // Fetch awarded badges
      supabase
        .from('user_badges')
        .select('badge_id, badges(*)')
        .eq('user_id', user.uid)
        .then(({ data }) => {
          if (data) setBadges(data.map((d: any) => d.badges));
        });
    }
  }, [user]);

  const toggleDarkMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    document.body.classList.toggle('dark', newMode);
    localStorage.setItem('darkMode', String(newMode));
  };

  const getBadgeIcon = (type: string) => {
    switch(type) {
      case 'medal': return <Medal className="text-amber-500" size={32} />;
      case 'shield': return <Shield className="text-blue-500" size={32} />;
      case 'star': return <Star className="text-yellow-500" size={32} />;
      case 'award': return <Award className="text-[#FF6B00]" size={32} />;
      default: return <AlertCircle className="text-slate-400" size={32} />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="glass-card p-8 mb-8 flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="shrink-0 relative">
          {user?.photoURL ? (
            <img src={user.photoURL} alt="Profile" className="w-24 h-24 rounded-full border-4 border-white/50 shadow-lg" />
          ) : (
            <div className="w-24 h-24 rounded-full bg-[#1B2F5E] text-white flex items-center justify-center border-4 border-white/50 shadow-lg">
              <User size={48} />
            </div>
          )}
          {profile?.streak_count > 0 && (
            <div className="absolute -bottom-2 -right-2 bg-[#FF6B00] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
              🔥 {profile.streak_count}
            </div>
          )}
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
            <h1 className="text-3xl font-headline font-bold">{user?.displayName || 'Voter'}</h1>
            {profile?.total_points > 0 && (
              <span className="text-sm font-bold text-[#1A6B3A] bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
                {profile.total_points} XP
              </span>
            )}
          </div>
          <p className="text-slate-500 dark:text-slate-400 mb-6">{user?.email}</p>
          
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <button onClick={toggleDarkMode} className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition">
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
              {isDark ? 'Light' : 'Dark'}
            </button>
            <button onClick={signOut} className="flex items-center gap-2 px-4 py-2 bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 rounded-lg text-sm font-medium hover:bg-rose-200 dark:hover:bg-rose-900/50 transition">
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="glass-card p-6 text-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Quizzes Taken</p>
          <p className="text-4xl font-bold text-[#1B2F5E] dark:text-white">{stats.count}</p>
        </div>
        <div className="glass-card p-6 text-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Average Score</p>
          <p className="text-4xl font-bold text-[#1A6B3A]">{Math.round(stats.average)}%</p>
        </div>
        <div className="glass-card p-6 text-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Best Score</p>
          <p className="text-4xl font-bold text-[#FF6B00]">{Math.round(stats.best)}%</p>
        </div>
      </div>

      <h2 className="text-2xl font-headline font-bold mb-6 flex items-center gap-2">
        <Award className="text-[#FF6B00]" />
        Your Achievements
      </h2>

      {badges.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {badges.map((badge) => (
            <motion.div 
              key={badge.id} 
              whileHover={{ scale: 1.05 }}
              className="glass-card p-6 flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 shadow-inner group-hover:bg-[#FF6B00]/10 transition">
                {getBadgeIcon(badge.icon_type)}
              </div>
              <h3 className="font-bold text-sm mb-1">{badge.name}</h3>
              <p className="text-[10px] text-slate-500">{badge.description}</p>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="glass-card p-12 text-center text-slate-500 italic">
          Pass your first quiz to earn a badge!
        </div>
      )}
    </motion.div>
  );
}
