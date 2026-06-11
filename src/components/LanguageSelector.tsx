import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 bg-slate-900/60 p-1.5 rounded-full border border-glass-border">
      <div className="text-slate-400/80 px-1.5 flex items-center justify-center">
        <Globe size={15} />
      </div>
      
      <div className="flex relative">
        <button
          onClick={() => setLanguage('zh')}
          className={`relative z-10 px-3.5 py-1 text-xs font-semibold rounded-full transition-colors duration-250 cursor-pointer ${
            language === 'zh' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          繁中
          {language === 'zh' && (
            <motion.div
              layoutId="activeLang"
              className="absolute inset-0 bg-cyan-600/80 rounded-full -z-10 shadow-[0_0_10px_rgba(6,182,212,0.4)]"
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          )}
        </button>

        <button
          onClick={() => setLanguage('en')}
          className={`relative z-10 px-3.5 py-1 text-xs font-semibold rounded-full transition-colors duration-250 cursor-pointer ${
            language === 'en' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          EN
          {language === 'en' && (
            <motion.div
              layoutId="activeLang"
              className="absolute inset-0 bg-cyan-600/80 rounded-full -z-10 shadow-[0_0_10px_rgba(6,182,212,0.4)]"
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          )}
        </button>
      </div>
    </div>
  );
};
