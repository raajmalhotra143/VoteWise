import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-[60vh] text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h1 className="text-6xl font-headline font-bold text-[#1B2F5E] dark:text-white mb-4">404</h1>
      <h2 className="text-2xl font-medium mb-6 text-slate-700 dark:text-slate-300">Page Not Found</h2>
      <p className="text-slate-500 mb-8 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn-primary">
        Go Home
      </Link>
    </motion.div>
  );
}
