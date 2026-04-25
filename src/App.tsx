import React, { Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';

const Home = React.lazy(() => import('./pages/Home'));
const Chat = React.lazy(() => import('./pages/Chat'));
const Timeline = React.lazy(() => import('./pages/Timeline'));
const Quiz = React.lazy(() => import('./pages/Quiz'));
const Myths = React.lazy(() => import('./pages/Myths'));
const Auth = React.lazy(() => import('./pages/Auth'));
const Profile = React.lazy(() => import('./pages/Profile'));
const MockEVM = React.lazy(() => import('./pages/MockEVM'));
const ConstituencyInsights = React.lazy(() => import('./pages/ConstituencyInsights'));
const Form6Guide = React.lazy(() => import('./pages/Form6Guide'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function App() {
  const location = useLocation();

  useEffect(() => {
    // Check dark mode preference
    const isDark = localStorage.getItem('darkMode') === 'true' || 
                   (!('darkMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) document.body.classList.add('dark');
  }, []);

  return (
    <HelmetProvider>
      <div className="min-h-screen flex flex-col font-body bg-slate-50 dark:bg-[#0D1B3E] text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <Toaster position="top-center" />
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
          <Suspense fallback={<div className="flex h-64 items-center justify-center">Loading...</div>}>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/timeline" element={<Timeline />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/myths" element={<Myths />} />
                <Route path="/mock-evm" element={<MockEVM />} />
                <Route path="/constituency" element={<ConstituencyInsights />} />
                <Route path="/form6-guide" element={<Form6Guide />} />
                <Route path="/auth" element={<Auth />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/profile" element={<Profile />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </Suspense>
        </main>
        
        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default App;
