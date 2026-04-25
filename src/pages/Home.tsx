import { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageSquare, Calendar, HelpCircle, ShieldAlert, Cpu, Database, LayoutPanelLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const Spline = lazy(() => import('@splinetool/react-spline'));

export default function Home() {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const features = [
    {
      title: t('nav.chat'),
      desc: "Ask anything about elections to our smart AI.",
      icon: <MessageSquare className="text-[#FF6B00]" size={28} />,
      link: "/chat"
    },
    {
      title: t('nav.timeline'),
      desc: "Step-by-step guide to the Indian election process.",
      icon: <Calendar className="text-[#1A6B3A]" size={28} />,
      link: "/timeline"
    },
    {
      title: t('nav.quiz'),
      desc: "Test your knowledge on voting rights and basics.",
      icon: <HelpCircle className="text-indigo-500" size={28} />,
      link: "/quiz"
    },
    {
      title: t('nav.myths'),
      desc: "Debunk common myths about EVMs and voting.",
      icon: <ShieldAlert className="text-rose-500" size={28} />,
      link: "/myths"
    },
    {
      title: t('nav.evm'),
      desc: "Practice voting on a simulated machine.",
      icon: <Cpu className="text-blue-500" size={28} />,
      link: "/mock-evm"
    },
    {
      title: t('nav.constituency'),
      desc: "Historical data and voting trends.",
      icon: <Database className="text-emerald-500" size={28} />,
      link: "/constituency"
    },
    {
      title: t('nav.form6'),
      desc: "Voter registration assistant and checklist.",
      icon: <LayoutPanelLeft className="text-amber-500" size={28} />,
      link: "/form6-guide"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col"
    >
      <Helmet>
        <title>VoteWise — India's Election Education Assistant</title>
        <meta name="description" content="Learn about India's election process, voter registration, EVM, NOTA, and your voting rights with AI-powered guidance." />
      </Helmet>

      {/* Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between min-h-[70vh] mb-16 gap-8 px-4">
        <motion.div 
          className="flex-1 text-center lg:text-left z-10"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-headline font-extrabold text-[#1B2F5E] dark:text-white leading-tight mb-6">
            {t('hero.headline').split('.').map((part, i) => (
              <span key={i} className={i === 1 ? 'text-[#FF6B00]' : ''}>
                {part}{i === 0 ? '.' : ''} {i === 0 && <br className="hidden md:block"/>}
              </span>
            ))}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-lg mx-auto lg:mx-0">
            {t('hero.subheadline')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link to="/timeline" className="btn-accent shadow-lg shadow-[#FF6B00]/20">
              {t('hero.cta_learn')}
            </Link>
            <Link to="/chat" className="btn-primary shadow-lg shadow-[#1B2F5E]/20">
              {t('hero.cta_chat')}
            </Link>
          </div>
        </motion.div>

        <motion.div 
          className="w-full lg:w-[500px] h-[350px] md:h-[500px] shrink-0 relative rounded-3xl overflow-hidden shadow-2xl bg-white/50 dark:bg-black/20 border border-white/20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 animate-pulse">
              <span className="text-slate-400">Loading 3D Scene...</span>
            </div>
          }>
            <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
          </Suspense>
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background-light/20 dark:from-background-dark/20 to-transparent"></div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4"
      >
        <div className="sm:col-span-2 lg:col-span-1 flex flex-col justify-center p-6">
          <h2 className="text-3xl font-headline font-bold text-[#1B2F5E] dark:text-white mb-4">
            Everything you need <br className="hidden md:block"/> to know.
          </h2>
          <p className="text-slate-500 text-sm">
            Empowering voters with accurate information and interactive tools.
          </p>
        </div>

        {features.map((feat, i) => (
          <motion.div key={i} variants={itemVariants}>
            <Link to={feat.link} className="block group h-full">
              <div className="glass-card p-6 h-full transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:border-[#FF6B00]/30">
                <div className="bg-white dark:bg-slate-800 w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                  {feat.icon}
                </div>
                <h3 className="text-xl font-headline font-semibold text-[#1B2F5E] dark:text-white mb-2">
                  {feat.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed">
                  {feat.desc}
                </p>
                <div className="text-[#FF6B00] font-bold flex items-center text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <span className="ml-2 text-lg">→</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.section>

    </motion.div>
  );
}
