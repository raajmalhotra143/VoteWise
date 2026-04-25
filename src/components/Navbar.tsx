import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Vote, User, Languages, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import clsx from 'clsx';

export const Navbar = () => {
  const { user } = useAuth();
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
  };

  const links = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.timeline'), path: '/timeline' },
    { name: t('nav.quiz'), path: '/quiz' },
    { name: t('nav.myths'), path: '/myths' },
    { name: t('nav.chat'), path: '/chat' },
    { name: t('nav.evm'), path: '/mock-evm' },
    { name: t('nav.constituency'), path: '/constituency' }
  ];

  return (
    <nav className="sticky top-0 z-50 glass-card mx-2 md:mx-4 mt-4 px-4 md:px-6 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 font-headline font-bold text-xl text-[#1B2F5E] dark:text-white shrink-0">
        <Vote className="text-[#FF6B00]" />
        VoteWise
      </Link>
      
      {/* Desktop Links */}
      <div className="hidden xl:flex gap-4">
        {links.map((link) => (
          <NavLink 
            key={link.path} 
            to={link.path}
            className={({ isActive }) => 
              clsx(
                "font-medium transition-colors text-sm",
                isActive ? "text-[#FF6B00]" : "text-slate-600 hover:text-[#1B2F5E] dark:text-slate-300 dark:hover:text-white"
              )
            }
          >
            {link.name}
          </NavLink>
        ))}
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button 
          onClick={toggleLanguage}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-1 text-sm font-medium"
          aria-label="Toggle Language"
        >
          <Languages size={18} className="text-[#FF6B00]" />
          <span className="hidden sm:inline uppercase">{i18n.language}</span>
        </button>

        {user ? (
          <Link to="/profile" className="flex items-center gap-2 font-medium">
            {user.photoURL ? (
              <img src={user.photoURL} alt="Avatar" className="w-8 h-8 rounded-full border border-slate-200" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#1B2F5E] text-white flex items-center justify-center">
                <User size={16} />
              </div>
            )}
            <span className="hidden lg:block text-sm">{user.displayName?.split(' ')[0] || 'Profile'}</span>
          </Link>
        ) : (
          <Link to="/auth" className="btn-primary py-2 px-4 text-xs md:text-sm">Login</Link>
        )}

        {/* Mobile Menu Toggle */}
        <button 
          className="xl:hidden p-2 text-slate-600 dark:text-slate-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-card mx-2 p-4 xl:hidden flex flex-col gap-4 shadow-xl animate-in slide-in-from-top-2">
          {links.map((link) => (
            <NavLink 
              key={link.path} 
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) => 
                clsx(
                  "font-medium transition-colors p-2 rounded-lg",
                  isActive ? "bg-[#1B2F5E]/10 text-[#FF6B00]" : "text-slate-600 dark:text-slate-300"
                )
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};
